// Importing Modules
const express = require("express")
const dotenv = require('dotenv');
// Intializing the App
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require('./db/connect')

const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')


dotenv.config({ path: './.env' });

// middlewares
app.use(express.static('./public'))
app.use(express.json())

// routes

app.use('/api/v1/tasks', tasks)

// app.use('/', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 4000
const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL)

        app.listen(port, console.log(`Server is running on port: ${port}....`))

    } catch (error) {
        console.log('Error :' + error)
    }
}

start()

