const express = require('express');
const { getBook, addBook, updateBook, deleteBook, getMyBook } = require('../controller/book');
const { authenticate } = require('../middleware/authenticate');
const router = express.Router();

router.get('/book', getBook);

router.get('/books/:id', authenticate, getMyBook);

router.post('/book', authenticate, addBook);

router.put('/book/:id', authenticate, updateBook);

router.delete('/book/:id', authenticate, deleteBook);

module.exports = router;