const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port =  3000

dotenv.config()

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`)
})