// const sgMail = require('@sendgrid/mail')

// // const sendGridApiKey = "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"
// const sendGridApiKey = "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"
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(sendGridApiKey);

// // console.log(process.env.SENDGRID_API_KEY)

// const msg = {
//     to:'echaaranimohamed@gmail.com',
//     from:'echaaranimohamed@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js'
// }

// sgMail.send(msg)

// console.log('done')


const mailgun = require("mailgun-js");
const DOMAIN = process.env.EMAIL_DOMAIN
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});



const sendWelcome = (email,name) =>{
    mg.messages().send({
        // from: "Mailgun Sandbox <postmaster@sandbox6ba689b9959a453ea61e3e44646b91d8.mailgun.org>",
        from: "echaaranimohamed@gmail.com",
        to: email,
        subject: "Hello",
        text: `Welcome ${name}, to Task Manager App`
        
    },(err,body)=>{
        if(err) throw Error(err)
    
        console.log(body)
    })
}
const sendWhyDelete = (email,name) =>{
    mg.messages().send({
        // from: "Mailgun Sandbox <postmaster@sandbox6ba689b9959a453ea61e3e44646b91d8.mailgun.org>",
        from: "echaaranimohamed@gmail.com",
        to: email,
        subject: "Hello",
        text: `Hi ${name} :( , Tell us why did you delete you account PLiiiiiiiiiizzzzzzz -_-`
        
    },(err,body)=>{
        if(err) throw Error(err)
    
        console.log(body)
    })
}

module.exports = {
    sendWelcome,
    sendWhyDelete
}