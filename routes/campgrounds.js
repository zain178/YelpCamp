const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')

const Campground = require('../models/campground');

const { isLoggedIn, isAuthor, validateCampgrpund } = require('../middlewear')

const campgrounds = require('../controllers/campgrounds')

const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampgrpund, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.array('image'),validateCampgrpund, catchAsync(campgrounds.updateCampground))
    .get(catchAsync(campgrounds.showCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;  