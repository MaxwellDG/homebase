const express = require('express')
const axios = require('axios')
const cors = require('cors');
const JSONParser = require('body-parser').json;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()) /* Needed to allow responses from some websites to be validated */

app.use(JSONParser())

app.get('/weather/:lat/:long', async (req, res) => {
    let data = await axios.get(`https://api.darksky.net/forecast/14869e5a43df1a312c2e8801f2070667/${req.params.lat},${req.params.long}`) 
                        .then(responseData => {
                            return responseData.data
                         })
                        .catch(error => console.log("Server side - Error was: " + error.toString()))
    res.json(data)     
})

app.listen(port, () => console.log("Started up server on port 8080"))