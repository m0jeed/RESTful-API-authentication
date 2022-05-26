const express = require('express');
const jwt = require('jsonwebtoken')


const app =express();
const port = 4000
const fs = require('fs');


app.get('/api', (req,res)=>{
    res.json({"message" : "Welcome to the API"})
});

app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: "post request created.",
                authData
            
            })
        }
    })
   
});


app.post('/api/login', (req,res)=>{
    //Mock user
    const user = {
        id: 1,
        username: 'MJ',
        email: 'MJ@email.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '30s'},(err, token) => {
        res.json({
            token
        });
    });
});

function verifyToken(req, res,next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    }else{
      res.sendStatus(403)
    }
}

app.listen(port, ()=> console.log(`listening on port: ${port}`))