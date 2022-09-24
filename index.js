var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true        
}))

mongoose.connect('mongodb://localhost:27017/complaintdetail',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in connecting to database "));
db.once('open',()=>console.log("Connected to database"));
app.post("/index",(req,res)=>{
    var shop_owner_name = req.body.shopownername
    var shop_name = req.body.shopname
    var date = req.body.date
    var address = req.body.shopaddress
    var phno = req.body.phone
    var complaint = req.body.complaint
    var otherdetails = req.body.other
    var area = req.body.area
    var data = {
        "shop_owner_name":shop_owner_name,
        "shop_name":shop_name,
        "date":date,
        "address":address,
        "phno":phno,
        "complaint":complaint,
        "otherdetails":otherdetails,
        "area":area
        
    }
    db.collection('complaints').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    })
    return res.redirect('/success.html')
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/index')
}).listen(3000);
console.log("Listening from port 3000")