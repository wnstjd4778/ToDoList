const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    
    comment: {
        type: String,
        required: true,
    },
    important: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    day: {
        type: String,
        required: true
    }
});

todoSchema.static.createTodo = (payload) => {
    const todo = new this(payload);
    return todo.save();
}

todoSchema.static.updateByTodoId = (todoId, payload) => {
    return this.findOneAndUpdate({todoId}, payload, { new: true});
}

todoSchema.static.deleteByTodoId = (todoId) => {
    return this.remove({todoId});
}

todoSchema.static.today = () => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getFullMonth() + 1;
    // const day = date.getDate();
    // const today = year + "-" + month + "-" + day;
    return this.find({});
}

module.exports = mongoose.model('Todo', todoSchema);