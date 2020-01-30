var nodeMailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

var options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/emailTemplates/',
       /* defaultLayout : 'defaultTemplate',*/
        partialsDir :'views/emailTemplates/partials/'
    },
    viewPath: 'views/emailTemplates/',
    partialsDir :'views/emailTemplates/partials/',
    extname: '.hbs'
};

var emailConfig = {
    service: 'gmail',
    auth: {
        user: 'mjn.nilesh@gmail.com',
        password: 'Gunnersrback123'
    }
}

var mailerTransporter = nodeMailer.createTransport(emailConfig);
mailerTransporter.use('compile', hbs(options));

var triggerEmail = function(emailObj) {
    mailerTransporter.sendMail({
        from: 'mjn.nilesh@gmail.com',
        to: emailObj.emailTo,
        subject: emailObj.subject,
        template: emailObj.templateName,
        context: emailObj.emailObjVariables
    }, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent ' + info.response)
        }
    });

}

module.exports = {
    triggerEmail: triggerEmail
}