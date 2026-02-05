import joi from "joi";

export const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const taskSchema = joi.object({
    title: joi.string().min(1).required(),
    description: joi.string().allow(''),
    status: joi.string().valid('todo', 'inprogress', 'completed')
});
