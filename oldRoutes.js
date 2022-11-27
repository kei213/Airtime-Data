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

app.post('/create', (req, res) => {

	res.send("/create")
     
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