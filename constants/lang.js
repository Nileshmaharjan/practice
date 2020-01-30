module.exports = {
    SUCCESS: {
        httpCode: 200,
        message: 'success'
    },
    NO_RECORD_FOUND: {
        httpCode: 204,
        message: 'No Record'
    },
    PAGE_NOT_FOUND: {
        httpCode: 404,
        message: 'invalid page'
    },
    UNAUTHORIZED: {
        httpCode: 401,
        message: ' Unauthorized '
    },
    LOGIN: {
        LOGIN_SUCCESS: {
            httpCode:200,
            message:'You have been logged in successfully.'
        },
        INVALID_USERNAME: {
            httpCode: 401,
            message: 'Invalid Username or Email.'
        },
        INVALID_PASSWORD: {
            httpCode: 401,
            message: 'Invalid Password.'
        },
        INVALID_CURRENT_PASSWORD: {
            httpCode: 401,
            message: 'Current password is not valid.'
        },
        USER_NOT_FOUND: {
            httpCode: 401,
            message: 'You are not logged in from this device'
            // if user is not found  by id calculated by jwt from given token
            // if user is not returned by passport package
        },
        CREDENTIAL_NOT_FOUND: {
            httpCode: 401,
            message: 'Missing credentials.'
        },
        TOKEN_NOT_FOUND: {
            httpCode: 400,
            message: 'No auth token.'
        },
        TOKEN_EXPIRED: {
            httpCode: 410,
            message: 'Token has been expired.'//unique code for logout
        },
        FB_UNLINKED_EMAIL_EXISTS: { // if fb account is valid and email exists but not linked with petbook
            httpCode: 301, // redirect to link account
            message: 'Email exist for requested facebook account.Link this account to facebook.'
        },
        FB_NOT_REGISTERED_IN_PETBOOK: { // if fb account is valid but not registered with petbook
            httpCode: 310, // redirect to registration
            message: 'This account is not registered with petbook.'
        },
        FB_EMAIL_NOT_FOUND: { // if fb account is valid and email does not exists and also not registered petbook
            httpCode: 310, // redirect to registration
            message: 'Unable to fetch email from your profile.'
        },
        FB_TOKEN_NOT_FOUND: {
            httpCode: 401,
            message: 'Token not found.'
        },
        FAILED_TO_FETCH_FB:{
          httpCode:400, // call for try again
          message:'something went wrong with this token'
        },
        DISABLED_BY_ADMIN: {
            httpCode: 403,
            message: 'You have been temporarily disabled by administrator.Please contact administrator for further details.'
        },
    },
    REGISTER: {
        REGISTER_SUCCESS: {
            httpCode: 200,
            message: 'You have been registered successfully.Please check your email to verify your account.'
        },
        FB_REGISTER_SUCCESS: {httpCode: 200, message: 'You have been registered successfully.'},
        EXIST_EMAIL: {httpCode: 409, message: 'Email already exists.'},
        EXIST_CONTACT_NUMBER: {httpCode: 409, message: 'Contact number is already exists.'},
        EXIST_USER_NAME: {httpCode: 409, message: 'User name is already exists.'},
        EXIST_FB_ID: {httpCode: 409, message: 'User account is already exists for provided token.'},
        DISABLED_BY_ADMIN: {
            httpCode: 403,
            message: 'You have been temporarily disabled by administrator.Please contact administrator for further details.'
        },
        EMAIL_EXIST_NOT_VERIFIED: {httpCode: 302, message: 'Email exists but not verified.'},
        EMAIL_EXIST_FB_REGISTER : {httpCode:301,message:'Email exist for requested facebook account.Link this account to facebook.'},
        EMAIL_VERIFIED: {message: 'Your email has been verified successfully.'},
        INVALID_FB_TOKEN:{httpCode:401,message:'Invalid facebook access token.'},
        INVALID_EMAIL_VERIFICATION: {message: 'Invalid token.'}

    },
    CHECK_USER_NAME: {
        NOT_EXIST_USER_NAME: {httpCode: 200, message: 'Success'}
    },
    RESEND_EMAIL_VERIFICATION: {
        ALREADY_ACTIVE: {httpCode: 409, message: 'User is already active.'},
        NO_EMAIL_FOUND: {httpCode: 449, message: 'No record found for the email'},
        RESEND_EMAIL_SUCCESS: {
            httpCode: 200, message: 'Please check your email to verify your account'
        }
    },
    CREATE_PET_PROFILE:{
        SUCCESS:{httpCode:200,message:'Pet profile has been created successfully.'},
        BIRTH_DATE_VALIDATE:{httpCode:422,message:'Birth date should not be in future.'}
    },
    FORGOT_PASSWORD: {
        SUCCESS: {
            httpCode: 200,
            message: 'An email has been sent, please check your email to reset password.'
        },
        EMAIL_NOT_FOUND: {
            httpCode: 310, // redirect to registration
            message: 'We are unable to find any account with this email.'
        },
    },
    RESET_PASSWORD: {
        SUCCESS: {
            httpCode: 200,
            message: 'Password has been changed successfully.'
        },
        INVALID_TOKEN: {
            httpCode: 422,
            message: 'Invalid token.'
        },
        EXPIRED_LINK: {
            httpCode: 422,
            message: 'Link has been expired.'
        },
    },
    PET_REMOVE: {
        SUCCESS: {
            httpCode: 200,
            message: 'Pet has been remove permanently.'
        },
        NOT_FOUND: {
            httpCode: 204,
            message: 'Pet not found.'
        },
        NOT_SELECTED: {
            httpCode: 204,
            message: 'Please select a pet to remove.'
        },
    },
    USER: {
        NOT_FOUND: {
            httpCode: 204,
            message: 'User Not Found.'
        }
    }
};
