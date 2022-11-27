const admin = require("firebase-admin")
const dotenv = require('dotenv').config()

// initialise firebase
const initFirebase = () => {
	admin.initializeApp({
	  credential: admin.credential.cert({
	  	"type": "service_account",
	    "project_id": "airtime-data-57cd2",
	    "private_key_id": "29fe0a6ee95c38383992f9d6b78f793cd858efdd",
	    "private_key": process.env.PRIVATEKEY,
	    "client_email": "firebase-adminsdk-qlnu9@airtime-data-57cd2.iam.gserviceaccount.com",
	    "client_id": "110265252860779626864",
	    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	    "token_uri": "https://oauth2.googleapis.com/token",
	    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qlnu9%40airtime-data-57cd2.iam.gserviceaccount.com"
	  })
	})
}	

module.exports = { initFirebase }
