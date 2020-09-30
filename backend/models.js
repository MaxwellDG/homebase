import mongoose from 'mongoose'

const defaultCollections = {
        "Work Collection" : {
            name: "Work Collection",
            collectionType: "Work",
            urls: ["gmail.com", "hotmail.com", "duckduckgo.com"]
        },
        "News Collection" : {    
            name: "News Collection",
            collectionType: "News",
            urls: ["youtube.com", "nationalpost.com", "theglobeandmail.com"]
        },
        "Bills Collection": {
            name: "Bills Collection",
            collectionType: "Bills",
            urls: ["fido.ca", "enercare.com", "pcfinancial.com", "simplii.com"]
        },
        "Interests Collection": {
            name: "Interests Collection",
            collectionType: "Interests",
            urls: ["kurzgesagt.org", "deviantart.com", "etsy.com"]
        }
}



const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: Object,
        required: false,
        default: {lat: 43.65121272925317,
                  lng: -79.40022880021183
        }
    },
    collections: {
        type: Object,
        required: false,
        default: defaultCollections
} 
})

export const userInfoModel = mongoose.model("userInfoModel", userSchema)