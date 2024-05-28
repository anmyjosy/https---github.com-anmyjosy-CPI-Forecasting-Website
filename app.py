from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import statsmodels.api as sm
import pandas as pd
from pandas.tseries.offsets import DateOffset
import gdown
import plotly.graph_objects as go
import plotly.io as pio


app = Flask(__name__)
CORS(app)

# Google Drive shareable link
url = 'https://drive.google.com/uc?id=1eu83KllS90UMZBDtnUjC7q1oQFQyDe8B'


# Download the file
output = 'preprocessed_data.csv'
gdown.download(url, output, quiet=False)

# Load the DataFrame
df = pd.read_csv(output)
df['Date']=pd.to_datetime(df['Date'])
df.set_index('Date',inplace=True)
future_dates=[df.index[-1]+DateOffset(months=x)for x in range(0,20)]
future_datest_df=pd.DataFrame(index=future_dates[1:],columns=df.columns)

a={'Cereals and products': (1, 1, 1), 'Meat and fish': (0, 1, 0), 'Egg': (2, 1, 2), 'Milk and products': (1, 1, 1), 'Oils and fats': (1, 1, 0),
   'Fruits': (1, 1, 0), 'Vegetables': (0, 1, 1), 'Pulses and products': (1, 1, 0), 'Sugar and Confectionery': (1, 1, 0), 'Spices': (1, 1, 1), 'Non-alcoholic beverages': (1, 1, 1),
   'Prepared meals, snacks, sweets etc.': (2, 1, 2), 'Food and beverages': (0, 1, 1), 'Pan, tobacco and intoxicants': (0, 1, 0), 'Clothing': (2, 1, 1), 'Footwear': (1, 1, 1),
   'Clothing and footwear': (2, 1, 1), 'Housing': (0, 1, 0), 'Fuel and light': (0, 1, 1), 'Household goods and services': (2, 1, 3), 'Health': (3, 1, 0),
   'Transport and communication': (0, 1, 1),
   'Recreation and amusement': (0, 1, 0), 'Education': (0, 1, 1), 'Personal care and effects': (1, 1, 1), 'Miscellaneous': (1, 1, 1), 'General index': (0, 1, 1)}
s={'Cereals and products': (1, 1, 1, 12), 'Meat and fish': (0, 1, 0, 12), 'Egg': (2, 1, 2, 12), 'Milk and products': (1, 1, 1, 12), 'Oils and fats': (1, 1, 0, 12),
    'Fruits': (1, 1, 0, 12), 'Vegetables': (0, 1, 1, 12), 'Pulses and products': (1, 1, 0, 12), 'Sugar and Confectionery': (1, 1, 0, 12), 'Spices': (1, 1, 1, 12),
    'Non-alcoholic beverages': (1, 1, 1, 12), 'Prepared meals, snacks, sweets etc.': (2, 1, 2, 12), 'Food and beverages': (0, 1, 1, 12), 'Pan, tobacco and intoxicants': (0, 1, 0, 12),
    'Clothing': (2, 1, 1, 12), 'Footwear': (1, 1, 1, 12), 'Clothing and footwear': (2, 1, 1, 12), 'Housing': (0, 1, 0, 12), 'Fuel and light': (0, 1, 1, 12),
    'Household goods and services': (2, 1, 3, 12), 'Health': (3, 1, 0, 12), 'Transport and communication': (0, 1, 1, 12),
    'Recreation and amusement': (0, 1, 0, 12), 'Education': (0, 1, 1, 12), 'Personal care and effects': (1, 1, 1, 12), 'Miscellaneous': (1, 1, 1, 12), 'General index': (0, 1, 1, 12)}

def graph(x):
  global future_df
  future_df=pd.concat([df,future_datest_df])
  model=sm.tsa.statespace.SARIMAX(future_df[x],order=a[x],seasonal_order=s[x])
  results=model.fit()
  b=results.predict(start=120,end=140)
  future_df['forecast']=results.predict(start=120,end=140)
  return b
@app.route('/cpi', methods=['GET'])
def get_cpi_data():
    attribute = request.args.get('attribute')

    if attribute in df.columns:
        df1=graph(attribute)
        fig = go.Figure()
        trace1 = go.Scatter(x=future_df.index, y=future_df[attribute], mode='lines', name=attribute)
        trace2 = go.Scatter(x=future_df.index, y=future_df['forecast'], mode='lines', name='Forecast')

        # Create layout
        layout = go.Layout(xaxis=dict(title='Date'),
                   yaxis=dict(title='Value'))

        # Create figure
        fig = go.Figure(data=[trace1, trace2], layout=layout)
        graph_json = pio.to_json(fig)
        df1.index=pd.to_datetime(df1.index)
        df1.index=df1.index.date
        new_data=pd.DataFrame()
        new_data['Date']=df1.index
        new_data['forecast']=df1.iloc[:22,].tolist()
        new_data['Date'] = new_data['Date'].apply(lambda x: x.strftime('%Y-%m-%d'))
        data = new_data[['Date', "forecast"]].rename(columns={attribute: 'forecast'}).to_dict(orient='records')
    else:
       data = [{"Date": "", "forecast": "No data available for this attribute"}]


    return jsonify({"attribute": attribute, "data": data,"plot": graph_json})




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5173, debug=True)
