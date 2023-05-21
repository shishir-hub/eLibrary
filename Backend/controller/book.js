const { default: mongoose } = require("mongoose");
const Book = require("../model/Book");
const User = require("../model/User");


const getBook = async (req, res, next) => {
    try {
        let books = await Book.aggregate();

        res.send({
            data: books,
            msg: "All Books"
        })
    } catch (error) {
        next(error);
    }
}

const getMyBook = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        let my_books = await Book.aggregate([
            {
                $match: { user_id: user._id }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'uploaded_by',
                }
            },
            {
                $unwind: '$uploaded_by'
            },
        ]);

        res.send({
            data: my_books,
            msg: "All Books"
        })
    } catch (error) {
        next(error);
    }
}

const addBook = async (req, res, next) => {
    try {
        let new_book = await Book.create({ ...req.body });

        res.send({
            data: new_book,
            msg: "New Book added"
        })
    } catch (error) {
        next(error);
    }
}

const updateBook = async (req, res, next) => {
    try {
        let updated_book = await Book.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

        res.send({
            data: updated_book,
            msg: "Book Updated"
        })
    } catch (error) {
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        let deleted_book = await Book.findByIdAndDelete(req.params.id);

        res.send({ msg: "Book deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBook,
    addBook,
    updateBook,
    deleteBook,
    getMyBook,
}