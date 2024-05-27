const mongoose=require('mongoose')
const EmploySchema=new mongoose.Schema({
  name:{type: String, required: true, unique: true},
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  role:{type: String, required: true},
  purpose:{type: String, required: true}
})

const EmployeeModel=mongoose.model("employees",EmploySchema)
module.exports=EmployeeModel