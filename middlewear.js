const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError.js')
const Campground = require('./models/campground')
const Review = require('./models/review.js')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You are not signed in')
        return res.redirect('/login')
    }
    next()
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampgrpund = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permisstion to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    //does haev eprmission to chnage the campground
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permisstion to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    //does have permission to chnage the campground
    next();
}