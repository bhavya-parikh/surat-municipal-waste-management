const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const certificateController = require('../app/http/controllers/admin/certificateController')
const certController = require('../app/http/controllers/certController')
const complainController = require('../app/http/controllers/complainController')
//Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')

function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest ,authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
    //Guest Routes
        //Request Certificate Form
    app.get('/request-certificate',guest,certController().getCert)
    app.post('/request-certificate',guest,certController().postCert)
        //Complain Form
    app.get('/complain-form',guest,complainController().getComplain)
    app.post('/complain-form',guest,complainController().postComplain)

        //Seller info
    app.get('/seller-details',homeController().seller)

        //Our Mission
    app.get('/our-mission',homeController().mission)
    
    //agent routes
    app.get('/agents/certificate-requests',auth,certificateController().index)
    app.post('/agents/certificate-requests/CertificateStatus',auth,certificateController().update)
}

module.exports = initRoutes