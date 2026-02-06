import Task from '../models/task.js';
import {taskSchema} from '../middlewares/validation.js';

export const getTask = async (req , res) => {
    try {
        const tasks = await Task.find({userId : req.user.id});
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

export const createTask = async (req,res) => {
    const {error} = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }; 
    try{
        const task = new Task({...req.body, userId: req.user.id});
        await task.save();
        res.status(201).json({message: "Task created successfully"});
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

export const updateTask = async(req, res) => {
    const {error} = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };
    try{
        const task = await Task.findByIdAndUpdate(
            {_id : req.params.id, userId: req.user.id}
            ,req.body, {new: true , runValidators: true}
        )
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.json(task);
    } catch(err){
        res.status(500).json({message: "Server error"});
    }
};

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({message: "Task updated successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async(req,res) => {
    try{
        const task = await Task.findByIdAndDelete(
            {_id : req.params.id, userId: req.user.id}
        )
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.json({message: "Task deleted successfully"});
    } catch(err){
        res.status(500).json({message: "Server error"});
    }
};