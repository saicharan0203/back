// const http = require('http');

// const server = http.createServer((req, res) => {    
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, World!');
// });

// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const morgan = require('morgan');  
const app = express();
const userModel = require('./models/user');
const dbConnection = require('./config/db');

app.use(morgan('dev')); // logging middleware
app.set('view engine', 'ejs');

app.use(express.json()); // built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // built-in middleware for parsing form data



app.use((req, res, next) => { // custom middleware
    console.log('Middleware 1');
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/about',(req,res,next)=>{ // route-specific middleware
    console.log('Middleware 2');
    next();
},(req,res)=>{
    res.render('about');
});

app.get('/register',(req,res)=>{
    console.log(req.body);
    res.render('register');
});

app.post('/register', async (req,res)=>{
    console.log(req.body);
    const {name,email,password } = req.body;
    await userModel.create({
        name:name,
        email:email,
        password:password
    })

    res.send('Registration successful');    
})


app.post('/get-form-data',(req,res)=>{
    console.log(req.body);
    res.send('Form data received');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});