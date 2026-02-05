import mongoose from "mongoose";

 const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        trim: true
    },
    description: {
        type:String,
        trim: true
    },
    status:{
        type:String,
        enum:['todo', 'inprogress', 'completed'],
        default: 'todo'
    },
    userId: {
        type :mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
 });

export default mongoose.model('Task', taskSchema);