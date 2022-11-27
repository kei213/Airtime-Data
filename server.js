const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const apiRoutes = require('./routes/apiRoutes')

// setting up express server
const app = express();
const PORT = process.env.PORT || 3000;

// set views engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Set static folder
app.use(express.static('static'));

// set views folder
app.set('views', __dirname + '/views');

// set upmiddleware
const csrfMiddleware = csrf({ cookie: true })
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

//middleware sets token for all requests
app.all('*', (req, res, next) => {
	res.cookie('XSRF-TOKEN', req.csrfToken())
	next()
})

// api routes
app.use('/api', apiRoutes)

// run express server
app.listen(PORT, () => 
	console.log(`Server running on port ${PORT}`));
