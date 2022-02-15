const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'You must write the task asshole!!'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
        minlength: [2, 'name must be more than 2 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)