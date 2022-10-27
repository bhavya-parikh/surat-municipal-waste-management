const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const certificateController = require('../app/http/controllers/admin/certificateController')
const certController = require('../app/http/controllers/certController')
const complainController = require('../app/http/controllers/complainController')
const adminComplainController = require('../app/http/controllers/admin/adminComplainController')
const adminUpdateWasteInfoController = require('../app/http/controllers/admin/adminUpdateWasteInfoController')
const wasteInfoController = require('../app/http/controllers/wasteInfoController')

//const superAdminController = require('../app/http/controllers/superAdminController')
//Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
//const smcadmin = require('../app/http/middlewares/smcadmin')


function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest ,authController().login)
    //app.post('/login', authController().postLogin)
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
     
        //contact
    app.get('/contact',homeController().contact)
    
    //agent routes
    app.get('/agents/certificate-requests',auth,certificateController().index)
    app.post('/agents/certificate-requests/CertificateStatus',auth,certificateController().update)

    //admin routes
    app.get('/admin/complains',auth,adminComplainController().index)
    app.post('/admin/complains/ComplainStatus',auth,adminComplainController().update)
    
    //To submit waste info 
    app.get('/admin/update-waste-info',auth,adminUpdateWasteInfoController().getInfo)
    app.post('/admin/update-waste-info',auth,adminUpdateWasteInfoController().postInfo)
    app.post('/admin/update-waste-info/status',auth,adminUpdateWasteInfoController().update)
    
    //To view waste info
    app.get('/update-waste-info-back',wasteInfoController().index)
    app.get('/waste-info-user',wasteInfoController().user)
   
   //admin panel
    app.post('/login',authController().postLogin)
    app.get('/admin/adminpanel',auth,authController().adminpanel)


    // app.get('/citizens/track-certificate',trackingController().getTrack)
    // app.post('/citizens/track-certificate',trackingController.postTrack)

    //app.post('/update-waste-info-back',auth,adminUpdateWasteInfoController().postInfo)
    //super admin routes
    //app.get('/admin/userGeneration',auth,superAdminController().getUser)
    //app.post('/admin/userGeneration',auth,superAdminController().insertUser)
}

module.exports = initRoutes