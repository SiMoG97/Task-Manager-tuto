const DOMAIN = process.env.EMAIL_DOMAIN
const mailgun = require("mailgun-js")({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});


const sendWelcome = (email,name) =>{
    mailgun.messages().send({
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
    mailgun.messages().send({
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