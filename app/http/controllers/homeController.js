function homeController(){
    return {
        index(req,res){
            res.render('index')
        },
        seller(req,res){
            res.render('seller-info')
        },
        mission(req,res){
            res.render('our-mission')
        },
        contact(req,res){
            res.render('contact')
        }
    
    }
}

module.exports = homeController