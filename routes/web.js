const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const certificateController = require('../app/http/controllers/admin/certificateController')
const certController = require('../app/http/controllers/certController')
//Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')

function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest ,authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
    //Guest Routes
    app.get('/request-certificate',guest,certController().getCert)
    app.post('/request-certificate',guest,certController().postCert)
    //agent routes
    app.get('/agents/certificate-requests',auth,certificateController().index)
    
}

module.exports = initRoutes