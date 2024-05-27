from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import statsmodels.api as sm
import pandas as pd
from pandas.tseries.offsets import DateOffset
import io
import base64
import plotly.graph_objects as go
import plotly.io as pio


app = Flask(__name__)
CORS(app)

# Load the DataFrame
df = pd.read_csv("C:/Users/asus/Desktop/castfore/preprocessed_data.csv")
df['Date']=pd.to_datetime(df['Date'])
df.set_index('Date',inplace=True)
future_dates=[df.index[-1]+DateOffset(months=x)for x in range(0,20)]
future_datest_df=pd.DataFrame(index=future_dates[1:],columns=df.columns)

def graph(x):
  global future_df
  future_df=pd.concat([df,future_datest_df])
  model=sm.tsa.statespace.SARIMAX(future_df[x],order=(1,1,3),seasonal_order=(1,1,3,12))
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
