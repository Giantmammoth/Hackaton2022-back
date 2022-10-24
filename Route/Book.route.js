const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth')
const validateObjectId = require('../Middleware/validateObjectId')
const {upload} = require('../Middleware/Multer.book')
const bookCRtl = require('../Controller/Book.controller')

router.post('/uploadsBook/:id',[validateObjectId, auth, upload.single('book')], bookCRtl.uploadBook);
router.get('/PublicBook', bookCRtl.getAllPublicBook);
router.get('/PrivateBook/:id',[validateObjectId, auth], bookCRtl.getUserPrivateBook);
router.get('/downloadBook/:id',[validateObjectId, auth], bookCRtl.downloadBook);
module.exports = router;