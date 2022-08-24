const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const admin = require("firebase-admin")
const webpack = require('webpack')
const dotenv = require('dotenv').config()



webpack({
  // [Configuration Object](/configuration/)  
	  entry: './static/js/env-variables.js',	
	  output: { path: __dirname, filename: './static/js/bundle.js' },
	  plugins: [
	    new webpack.DefinePlugin({
	        'process.env.NODE_ENV': JSON.stringify(process.env.APIKEY)
	    })
	  ],
 }, 
 (err, stats) => { // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    // [Handle errors here](#error-handling)
    console.log(err)
  }
  // Done processing
});

// firebase
const serviceAccount = require("./airtime-data-57cd2-firebase-adminsdk-qlnu9-29fe0a6ee9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// setting up express server
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
	console.log(`Server running on port ${PORT}`));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// set upmiddleware
const csrfMiddleware = csrf({ cookie: true })
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

//Set static folder
app.use(express.static('static'));

// set views folder
app.set('views', __dirname + '/views');

//middleware sets token for all requests
app.all('*', (req, res, next) => {
	res.cookie('XSRF-TOKEN', req.csrfToken())
	next()
})

// set up routing
app.get('/', (req, res) => {
	console.log('/')
	const sessionCookie = req.cookies.session || '';

	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('index.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})

app.get('/apiKey', (req, res) => {
	console.log('/apiKey')
    const key = process.env.APIKEY
	res.json({'key': key})
})

app.get('/index', (req, res) => {
	console.log('/index')
	const sessionCookie = req.cookies.session || '';	
    
	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('index.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})

app.get('/airtime-center-form', (req, res) => {
	console.log('/airtime-center-form')
	const sessionCookie = req.cookies.session || '';	
    
	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('airtime-center-form.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})

app.get('/welcome-form', (req, res) => {
	console.log('/welcome-form')
	const sessionCookie = req.cookies.session || '';	    
	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('welcome-form.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})

app.get('/login', (req, res) => {
	console.log('/login')	
	res.render('login.html')
})

app.get('/table', (req, res) => {	
	console.log('/table')
	const sessionCookie = req.cookies.session || '';    
	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('table.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})

app.get('/phone-numbers', (req, res) => {
	console.log('/phone-numbers')
	const sessionCookie = req.cookies.session || '';	
    
	admin.auth()
	     .verifySessionCookie(sessionCookie, true)
	     .then (() => {
	     	res.render('phone-numbers.html')
	     })
	     .catch((error) => {
	     	res.redirect('/login')
	     })	
})



app.post('/sessionLogin', (req, res) => {

	const idToken = req.body.idToken.toString()
          console.log('idToken =', idToken )
    const userEmail =  req.body.userEmail 
          console.log('email =', userEmail ) 
     
	const expiresIn = 60 * 60 * 24 * 2 * 1000

	admin.auth().createSessionCookie(idToken, { expiresIn })
         .then((sessionCookie) => {
         	const options = { maxAge: expiresIn, httpOnly: true };
         	res.cookie('session', sessionCookie, options);
         	res.end(JSON.stringify( {status: 'success'}));
            },
            (error) => {
         	res.status(401).send('UNAUTHORISED REQUEST!')
            }	
         ) 
     
})


app.get('/sessionLogout', (req, res) => {
 
  const sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((error) => {
      res.redirect('/login');
    });
});