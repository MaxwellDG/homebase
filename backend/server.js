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

app.use(cors())

app.use(bodyParser.json())


/* Routing */

/* -- Login -- */
app.get('/account/login/:username/:password', (req, res) => {
    console.log("Logging in.....")
    Models.userInfoModel.find({username: req.params.username, password: req.params.password}, (error, user) => {
        if(error){
            console.log("Server side error: " + error)
        } else {
            res.json({
                user
            })
        }
    })
})


/* -- SignUp -- */
app.post('/account/signup/:username/:password', (req, res) => {
    console.log("Signing Up.....")
    Models.userInfoModel.find({username: req.params.username}, (error, user) => {
        if(error){
            res.json({
                error
            })
            console.log(error)
        } else if(user !== undefined && user.length > 0){
            res.status(205)
            res.json({
                info: "User already exists",
                user
            })
        } else {
            const newUser = new Models.userInfoModel({
                username: req.params.username,
                password: req.params.password
            })
            newUser.save(err => {
                if(err){
                    console.log("Server-side error: " + err)
            }})
            res.json({
                newUser
            })
        }
    })
})

/* -- Update Collection -- */
app.post('/account/updatecollection/:type/:username/:name/:url', (req, res) => {
    console.log("Updating collection.....")
    Models.userInfoModel.findOne({username: req.params.username}, (err, doc) => {
        if(err){
            return(
            res.json({
                err
            }) )
        } else {
            if(req.params.type === "add"){
                console.log("Here add")
                console.log(doc)
                doc.collections[req.params.name].urls.push(req.params.url)
                } else if(req.params.type === "minus") {
                    console.log("Here minus")
                    doc.collections[req.params.name].urls.splice(doc.collections[req.params.name].urls.indexOf(req.params.url), 1)
        }
        doc.markModified('collections')
        doc.save((err, product) => {
            if(err){
                console.log(err)
            } else {
                res.send(product)
            }
        } )
        }
    })
})

/* -- Create Collection -- */
app.post('/account/createcollection/:username/:name/:type/:urls', (req, res) => {
    console.log("Adding collection.....")
    Models.userInfoModel.findOne({username: req.params.username}, (err, doc) => {
        if(err){
            return(
                res.json({
                    error
                })
            )
        } else {
            console.log(req.params.urls)
            doc.collections[req.params.name] = {
                name: req.params.name,
                collectionType: req.params.type,
                urls: req.params.urls.split(",")
                }
            }
            doc.markModified('collections')
            console.log(doc.collections[req.params.name])
            doc.save((err, result) => {
                if(err){
                    console.log(err)
                } else {
                    res.send(doc)
                }
            })
        })
})

/* -- Delete Collection -- */
app.post('/account/deletecollection/:username/:collectionName', (req, res) => {
    console.log("Deleting collection.....")
    Models.userInfoModel.findOne({username: req.params.username}, (err, doc) => {
        if(err){
            console.log(error)
            res.json({
                error
            })
        } else {
            delete doc.collections[req.params.collectionName]
            doc.markModified('collections')
            doc.save((err, product) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(product)
                }
            })
        }}
    )
})



/* -- Weather -- */
app.get('/weather/:lat/:lng', async (req, res) => {
    let data = await axios.get(`https://api.darksky.net/forecast/14869e5a43df1a312c2e8801f2070667/${req.params.lat},${req.params.lng}`) 
                        .then(responseData => {
                            console.log("Retrieving weather.....")
                            return responseData.data
                         })
                        .catch(error => console.log("Server side - Error was: " + error.toString()))
    res.json(data)     
})


/* -- Update Location -- */
app.post('/weather/:user/:lat/:lng', (req, res) => {
    console.log("Updating location.....")
    Models.userInfoModel.findOne({username: req.params.user}, (err, doc) => {
        if(err){
            return(
                res.send({
                    err
                })
            )
        } else {
            doc.location = {lat: req.params.lat, lng: req.params.lng}
            doc.save((err, product) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(product)
                }
            })
        }
    })
} )

app.listen(port, () => console.log("Started up server on port 8080"))