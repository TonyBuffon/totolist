const Task = require('.././models/Task')
const asyncWrapper = require('./../middleware/asyncWrapper')
const { createCustomError } = require('../errors/errorController')

const getAllTasks = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({})
    res.status(200).json({
        status: 'success',
        numberOfTasks: tasks.length,
        tasks
    })

})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create({ name: req.body.name, completed: req.body.completed })
    res.status(201).json({
        status: 'success',
        task
    })

})
const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findById(taskID)
    if (!task) {
        return next(createCustomError(`No task with this id: ${req.params.id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        task
    })
})
const deleteTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
        return next(createCustomError(`No task with this id: ${req.params.id}`, 404))
    }
    res.status(204).json({
        status: 'success'
    })

})
const editTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No task with this id: ${req.params.id}`, 404))
    }
    res.status(200).json({
        status: 'updated successfully',
        task
    })

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    editTask,
}