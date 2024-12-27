import mongoose from "mongoose";
const ToDoSchema = new  mongoose.Schema({
    Title:{
        type:String,
        requirerd:true,
        uppercase:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    },
});
export const ToDo = mongoose.model('ToDo',ToDoSchema);