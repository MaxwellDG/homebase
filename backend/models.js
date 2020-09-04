import mongoose from 'mongoose'

    /* might need to add a unique key id for each option so they can be found and updated */
    const optionSchema = new mongoose.Schema({
        optionType:{
            type: String,
            required: false,
            default: "General",
        },
        urls:{
            type: Array,
            required: true
        },
        dateCreated:{
            type: Date,
            default: Date.now
        }
})


/* const defaultOptions = [new optionSchema({
    optionType: "Work",
    urls: ["www.gmail.com", "www.hotmail.com", "www.google.com"],
    dateCreated: Date.now
}), new optionSchema({
    optionType: "News",
    urls: ["www.youtube.com", "www.nationalpost.com", "www.theglobeandmail.com"],
    dateCreated: Date.now
}), new optionSchema({
    optionType: "Bills",
    urls: ["www.fido.ca", "www.enercare.com", "www.pcfinancial.com", "www.simplii.com"],
    dateCreated: Date.now
}), new optionSchema({
    optionType: "Socials",
    urls: ["www.instagram.com", "www.facebook.com", "www.youtube.com", "www.twitter.com"],
    dateCreated: Date.now
}), new optionSchema({
    optionType: "Interests",
    urls: ["www.kurzgesagt.com", "www.deviantart.com", "www.etsy.com"],
    dateCreated: Date.now
})
]
*/


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: Array,
        required: false,
        default: ["43.6532", "-79.3832"]
    }
    /* options: {
        type: [optionSchema],
        required: false,
        default: [defaultOptions]
} */
})

export const userInfo = mongoose.model("userInfo", userSchema)

export const option  = mongoose.model("option", optionSchema)
