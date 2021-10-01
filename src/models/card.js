const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card