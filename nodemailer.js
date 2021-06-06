const nodemailer = require("nodemailer");
const path = require('path');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "info.butaflowers@gmail.com",
        pass: "But@Flower$3113"
    },
});

const options = {
    from: "info.butaflowers@gmail.com",
    to: "muslim.ragimov@yahoo.com",
    subject: "Sending email with nodejs",
    text: "That's GREAT !!",
    attachments: [
        {
            filename: 'test.pdf', // <= Here: made sure file name match
            path: path.join(__dirname, './test.pdf'), // <= Here
            contentType: 'application/pdf'
        }
    ]
}

transporter.sendMail(options, function(err, info) {
    if(err) {
        console.log(err);
        return;
    }

    console.log("Sent: " + info.response);
})
