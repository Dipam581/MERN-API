const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
//const ExpenseModel = require("./models/Expense")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/expense');
  console.log("DB connected")
}

const expenseData = new mongoose.Schema({
    "date": Date,
    "item":String,
    "cost":Number
  });

  const Expense = mongoose.model('Expense', expenseData);



const server = express();
server.use(cors());
server.use(bodyParser.json());


server.post("/demo",async (req,res)=>{
    let expense = new Expense();
    expense.date = req.body.date;
    expense.item = req.body.item;
    expense.cost = req.body.cost;

    const doc = await expense.save()
    
    console.log(doc)
    res.json(doc);
})

server.get("/demo",async (req,res)=>{
    const data = await Expense.find({})
    res.json(data);
})


server.post("/update",async (req,res)=>{
  const editData = req.body;
  console.log(editData)
  try {
    await Expense.updateOne({_id : editData._id},{
      $set: {
        item : editData.item,
        cost : editData.cost
      }
    })
    return res.json({status : "ok", data : "updated"})
  } catch (error) {
    return res.json({status : "error", data : error})
  }
})



server.listen(8080,()=>{
    console.log("started")
})
