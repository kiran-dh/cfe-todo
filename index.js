import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ToDo } from './todo.module.js';
import { todo } from 'node:test';

dotenv.config();

const app= express();
const port=7000;
app.use(express.json());

async function connectDB(){
   const connection = await mongoose.connect(process.env.MONGO_URI);
   console.log(connection.connection.host);
}

app.listen(port,()=>{
    console.log('server started');
});

connectDB();


app.get('/',async(req,res)=>{
    const todo = await ToDo.find();
        res.status(200).json({
            todo,
        });
    });
            

app.post('/',async(req,res)=>{
    const newtodo=req.body;
    const todo = await ToDo.create(newtodo);
        res.status(200).json({
            todo,
        });
});

app.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const data = req.body;
    const todo = await ToDo.findById(id);
    if(todo){
        const updatedtodo = await ToDo.updateOne({_id: id},data);
        return res.status(200).json({
            updatedtodo,
        })
    }
        return res.status(404).json({message:'To Do list doesnt exist'});
});

app.delete('/:id',async(req,res)=>{
    const { id } = req.params;
    const todo=await ToDo.findById(id);
    if(todo){
        const deletedtodo = await ToDo.deleteOne({
            _id: id,
        });
        return res.status(404).json({deletedtodo});
    }
    
    return res.status(404).json({message:'To Do list doesnt exist'});
});


