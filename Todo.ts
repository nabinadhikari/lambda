import * as mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {type: String, default: false}
});

const todoModel = mongoose.model('todo', todoSchema);

export default todoModel;