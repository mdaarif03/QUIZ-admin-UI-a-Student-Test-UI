var express = require('express')
const router = express.Router();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://raza:12345@cluster0.va60tae.mongodb.net/?retryWrites=true&w=majority');

var db=mongoose.connection;

mongoose.connection.on('connected',connected=>{
    console.log("connected with database...");
});

db.on('error',()=>console.log('Error in connecting to database'));
db.once('open',()=>console.log('connected to database'))

app.post('/signup',(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var loginType=req.body.loginType;
    var address=req.body.address;
    var State=req.body.State;
    var password = req.body.password;

    var data={
        "name":name,
        "email":email,
        "phone":phone,
        "loginType":loginType,
        "address":address,
        "State":State,
        "passwoed":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log('Record Inserted Successfully');
    });
    return res.redirect('signup_success.html')

})

app.post('/login',(req,res)=>{
    var phone=req.body.phone;
    var password = req.body.password;

    var data={
        "phone":phone,
        "passwoed":password
    }
    return res.redirect('home.html')

})

app.get('/',(req,res)=>{
    res.set({
        "Allow_access_Allow_origin":'*'
    })
    return res.redirect('index.html');
}).listen(4000);

// Find Data if we find Data then use this 
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
})

// Delete Data 
router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Data deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


console.log('Listening on port 4000')