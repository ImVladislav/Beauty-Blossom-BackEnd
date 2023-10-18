const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        unique: true,
        required: true,
    },
    link: {
        type: String,
    
    },
    offlineShop: {
        type: Boolean,
        required: false,
    },
    onlineShop: {
        type: Boolean,
        required: false,
    },
    socialMedia: {
        type: Boolean,
        required: false,
    },



    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: ""
    }
}, {versionKey: false, timestamps: true});


userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    city: Joi.string(),
    number: Joi.number(),
    link: Joi.string(),
    socialMedia: Joi.boolean(),
    onlineShop: Joi.boolean(),
    offlineShop: Joi.boolean(),            
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    emailSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}