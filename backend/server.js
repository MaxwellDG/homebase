import express from 'express'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import * as Models from '../backend/models.js'

const app = express();
const port = process.env.PORT || 8080;

/* Establishing Database connection */
/* In Production, this will have to be changed to a Mongo Atlas (their Cloud) database. Ideally in a small cluster, but not totally necessary for this project */
mongoose.connect("mongodb://localhost:27017/homepage", { useNewUrlParser: true })
const database = mongoose.connection

database.on("error", (error) => {
    console.log("Database Error is: " + error)
})

database.once("open", () => {
    console.log("Database has connected")
})


/* MiddleWare */

app.use(cors()) /* Needed to allow responses from some websites to be validated */

app.use(bodyParser.json())



/* Routing */

app.get('/account/login/:username/:password', (req, res) => {
    console.log("Logging in.....")
    userInfoModel.find({username: req.params.username, password: req.params.password}, (error, user) => {
        if(error){
            console.log("Server side error: " + error)
        } else {
            console.log("Found something...")
            res.json({
                user
            })
        }
    })
})

app.post('/account/signup/:username/:password', (req, res) => {
    let existingUser = null
    userInfoModel.find({username: req.params.username, password: req.params.password}, (error, user) => {
        if(error){
            console.log(error)
        } else{
            existingUser = user 
        }
    })

    if(existingUser === null){
    const newUser = new Models.userInfoModel({
        username: req.params.username,
        password: req.params.password
    })
    newUser.save(err => {
        if(err){
            console.log("Server-side error: " + err)
    }})
    res.json({
        submitted: newUser
    })
}
})

app.post('/addOption/:username/:type/:urls', (req, res) => {
    /* find how to update to user's account */
    const newOption = new Models.optionModel({
        optionType: req.params.type,
        urls: req.params.urls
    })

    userInfoModel.findOneAndUpdate({username: req.params.username}) /* this is not finished */

    newOptions.save(err => {
        if(err){
            console.log("Server-side error: " + err)
        }
    })
    res.json({
        submitted: newOption
    })
})

app.post('updateOption/:username/:urls', (req, res) => {
    /* learn how to update documents */
})

app.get('/weather/:lat/:long', async (req, res) => {
    let data = await axios.get(`https://api.darksky.net/forecast/14869e5a43df1a312c2e8801f2070667/${req.params.lat},${req.params.long}`) 
                        .then(responseData => {
                            console.log("What up")
                            return responseData.data
                         })
                        .catch(error => console.log("Server side - Error was: " + error.toString()))
    res.json(data)     
})

app.listen(port, () => console.log("Started up server on port 8080"))