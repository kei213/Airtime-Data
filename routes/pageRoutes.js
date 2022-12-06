const express = require('express')
const router = express.Router()
const { initFirebase } = require('../initFirebase')
const admin = require("firebase-admin")


// set up routing
router.get('/', (req, res) => {
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

router.get('/apiKey', (req, res) => {
	console.log('/apiKey')
    const key = process.env.APIKEY
    console.log(key)
	res.json({'key': key})
})

router.get('/index', (req, res) => {
	
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

router.get('/airtime-center-form', (req, res) => {
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

router.get('/welcome-form', (req, res) => {
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

router.get('/login', (req, res) => {
	console.log('/login')	
	res.render('login.html')
})

router.get('/table', (req, res) => {	
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

router.get('/phone-numbers', (req, res) => {
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

router.post('/create', (req, res) => {

	res.send("/create")
     
})



router.post('/sessionLogin', (req, res) => {

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


router.get('/sessionLogout', (req, res) => {
 
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

module.exports = router