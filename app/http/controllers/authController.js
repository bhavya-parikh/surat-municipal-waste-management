const Agents = require('../../models/admins/agent')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    const _getRedirectUrl = (req) => {
        return req.agent.role === 'agent' ? '/agents/certificate-requests' : '/'
    }
    
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, agent, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!agent) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(agent, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/agents/certificate-requests')
                })
            })(req, res, next)

        },logout(req, res) {
            req.logout()
            return res.redirect('/login')  
          }
    }
}

module.exports = authController