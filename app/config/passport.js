const LocalStrategy = require('passport-local').Strategy
const Agent = require('../models/admins/agent')
const bcrypt = require('bcrypt')
const { message } = require('laravel-mix/src/Log')
 
function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},async (email,password,done)=>{
        const agent = await Agent.findOne({email:email})
        if(!agent){
            return done(null,false,{message: 'No user with this email'})
        }

        bcrypt.compare(password,agent.password).then(match=>{
            if(match){
                return done(null,agent,{message:'Logged in successfully'})
            }
            return done(null,false,{message:'Wrong email/password'})
        }).catch(err=>{
            return done(null,false,{message: 'Something went wrong'})
        })
    }))

    passport.serializeUser((agent,done)=>{
        done(null,agent._id)
    })

    passport.deserializeUser((id,done)=>{
        Agent.findById(id,(err,agent)=>{
            done(err,agent)
        })
    })
}

module.exports = init