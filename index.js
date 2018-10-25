import express from 'express';
import path from 'path';
import flash from 'flash';
import session from 'express-session';

/** */
import server_config from './config/server_config.json';
import controller from './src/controller';

/** */
const app=express();

/**config middleware*/
app.use(express.static(__dirname+'/public'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname+'/views'));

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(flash());
app.use(function(req,res,next){
    res.locals.success_message=req.flash('success_message');
    res.locals.fail_message=req.flash('fail_message');
    res.locals.error=req.flash('error');
    res.locals.errors=req.flash('errors');
    next();
});


/** */
app.use('/',controller);


const server=app.listen(server_config.server_port,()=>{console.log("Listening on port: "+server.address().port)});