require("dotenv").config()
const dbClient = require("./src/config/database")
const express = require("express")

dbClient()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/1.0/example", require("./src/1.0/routes/example.routes"))

app.listen(process.env.APP_PORT, process.env.APP_URL, () => console.log(`API server started on ${process.env.APP_URL}:${process.env.APP_PORT}`))