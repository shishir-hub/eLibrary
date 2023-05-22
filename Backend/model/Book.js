const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: [Number]
    },
    reviewed_by: {
        type: [ObjectId],
        ref: 'User',
    }
});

module.exports = mongoose.model('Book', BookSchema);