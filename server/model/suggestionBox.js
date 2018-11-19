const mongoose = require('mongoose')

const suggestionBoxSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true},
    suggestions: [
        { 
            body: {type: String, required: true},
            date: {type: Date, default: Date.now}
        }
    ],
})

module.exports = mongoose.model('SuggestionBox', suggestionBoxSchema)