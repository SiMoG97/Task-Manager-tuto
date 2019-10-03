module.exports =  mailgun = ()=>{
    const obj = {
        messages(){return this},
        send(){return this}
    }
    return obj
}

