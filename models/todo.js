const { Schema, model }= require('mongoose');
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
    dateCreated:{
        type: Date,
        default: Date.now()
    },
}); 

module.exports = model('Todo', TodoSchema);