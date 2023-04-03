const express = require('express')
const mongoose = require('mongoose');
const mongoconenction = require('./models/mongoConnect');
const path = require('path');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');

const User = require('./models/UserSchema');
const ExpressError = require('./utils/ExpressError');
const {isLoggedIn }= require('./utils/isLoggedIn');


// user routes
const userRouter = require('./routes/userRoute');
const eventsRouter = require('./routes/eventsRouter');
const newsRouter = require('./routes/newsRouter');

const app = express();

app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));




const sessionConifg ={
    name : 'library session',
    secret : 'thisismysecretdontrevealittoanyone',
    resave: false,
    saveUninitialized : true,
    cookie :{
        httpOnly: true,
        secure : false
    }
}



app.use(session(sessionConifg));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    // passport itself will add the user to the req object
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    
    next();
})

app.use('/users',userRouter);
app.use('/events',eventsRouter);
app.use('/news',newsRouter);

app.get('/',isLoggedIn,(req,res)=>{
    res.render('home',{title : "Elibrary | Home"})
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err,req,res,next)=>{
    const {statuscode = 500} = err;
    if(!err.message){
        err.message = "OH! NO  SOMETHING WENT WRONG";
    }

    res.status(statuscode).render('error',{err});
})

app.listen(5000,(err)=>{
    if(err){
        console.log("something went wrong starting the server");
    }
    else{
        console.log("server started at port 5000")
    }
})