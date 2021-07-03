const express = require('express');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
} )

app.post("/", (req, res) => {
   const firstName = req.body.first;
   const secondName = req.body.second;
   const email = req.body.email;

    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            } 
        ]
    }
    const jsonData = JSON.stringify(data);

    const url ='https://us6.api.mailchimp.com/3.0/lists/40177b6919';

    const options = {
        method : "post",
        auth : "ragu:bf85d5930e368c4c313e40192fc4d742-us6"
    }

    const request = https.request(url, options, (response)=>{

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data', (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post('/failure', ()=>{
    
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server is running at " + port)
})



