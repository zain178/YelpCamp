const express = require('express')
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middlewear.js')

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const reviews = require('../controllers/reviews.js')

const { reviewSchema } = require('../schemas.js')

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview))

router.delete('/:reviewId',isReviewAuthor, isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;

