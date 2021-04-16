const {check, validationResult} = require('express-validator')

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First Name is Required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is Required'),
    check('email')
    .isEmail()
    .withMessage('Enter valid Email'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be 6 character')
]

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Enter valid Email'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be 6 character')
]

exports.isRequestValidated = (req, res,next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({errors:errors.array()[0].msg})
    }
    next();
}