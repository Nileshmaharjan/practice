const joi = require('joi');
const httpStatusCode = require('http-status-codes');
const buildUsefulErrorObject = (errors) => {
    var errorMessage = '';
    errors.map((error) => {
        var messageError = `${error.message.replace(/[""]/g, '')}`;
        errorMessage += errorMessage?"\n":"";
		errorMessage += `${messageError}`;
    });

    return errorMessage;
}



module.exports = {
    validateBody: (schema, opt) => {
        return (req, res, next) => {
            const options = opt || {abortEarly: false};
            const result = joi.validate(req.body, schema, options);
            
            if (result.error) {
                const errors = result.error? buildUsefulErrorObject(result.error.details) : null;
                return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
                    message: errors
                })
            }
            next()
        }
    },

    requireJsonContent: (req, res, next) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(httpStatusCode.BAD_REQUEST).send({
                status: httpStatusCode.BAD_REQUEST,
                message: 'Bad Request',
                error: 'Server requires application/json but got ' + req.headers['content-type'],
                data: []
            })
        } else {
            next()
        }
    }
}