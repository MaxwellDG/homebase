import express from 'express'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

const port = process.env.PORT || 3030;
const baseUrl = "https://ec2-18-222-230-82.us-east-2.compute.amazonaws.com"

app.use(cors())
app.use(bodyParser.json())

/* ---------------------------------------------------------- */
/* This was only used in Development and is not for Production */
/* ---------------------------------------------------------- */


/* Routing */

/* -- Login -- */
app.get('/account/login/:username/:password', (req, res) => {
    console.log("Logging in.....")
    axios.get(`${baseUrl}/account/login/${req.params.username}/${req.params.password}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })
})


/* -- SignUp -- */
app.post('/account/signup/:username/:password', (req, res) => {
    console.log("Signing Up.....")
    axios.post(`${baseUrl}/account/signup/${req.params.username}/${req.params.password}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })
})

/* -- Update Collection -- */
app.post('/account/updatecollection/:type/:username/:name/:url', (req, res) => {
    console.log("Updating collection.....")
    axios.post(`${baseUrl}/account/updatecollection/${req.params.type}/${req.params.username}/${req.params.name}/${req.params.url}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })
})

/* -- Create Collection -- */
app.post('/account/createcollection/:username/:name/:type/:urls', (req, res) => {
    console.log("Adding collection.....")
    axios.post(`${baseUrl}/account/createcollection/${req.params.username}/${req.params.name}/${req.params.type}/${req.params.urls}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })
})

/* -- Delete Collection -- */
app.post('/account/deletecollection/:username/:collectionName', (req, res) => {
    console.log("Deleting collection.....")
    axios.post(`${baseUrl}/account/deletecollection/${req.params.username}/${req.params.collectionName}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })
})



/* -- Weather -- */
app.get('/weather/:lat/:lng', async (req, res) => {
    axios.get(`${baseUrl}/weather/${req.params.lat}/${req.params.lng}`)
        .then(response => {
            res.json({
                response: response.data
            })
        }).catch(reason => {
            res.json({
                reason
            })
        })   
})


/* -- Update Location -- */
app.post('/weather/:user/:lat/:lng', (req, res) => {
    console.log("Updating location.....")
    axios.post(`${baseUrl}/weather/${req.params.user}/${req.params.lat}/${req.params.lng}`)
    .then(response => {
        res.json({
            response: response.data
        })
    }).catch(reason => {
        res.json({
            reason
        })
    })
} )

app.listen(port, () => console.log(`Started up server on port ${port}`))