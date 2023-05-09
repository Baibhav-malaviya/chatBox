const express  = require('express');
const serverless = require('serverless-http');
const os= require('os');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const primaryUid=os.userInfo().uid;
if(primaryUid != os.userInfo().uid) {
    const secondaryUid=os.userInfo().uid;
}
//? code from line 10-13 identify both the user as primary and secondary

// Just checking the os modules

console.log(`The userInfo of this device is ${os.userInfo().uid}`);

app.use(express.static ('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://127.0.0.1:27017/karandb');

const textSchema = new mongoose.Schema({
    text:String
})

const textData = mongoose.model('textData',textSchema);

app.get('/',(req,res)=>{

    textData.find({}).then((texts)=>{
        res.render('index',{texts:texts});
        // console.log(texts);
    })
    
});
app.post('/',(req,res)=>{
    let text = req.body.text;

    if(text != ""){
        let inputText = new textData({
            text:text
        })
        inputText.save();
        res.redirect('/')
    }

});

// const router = express.Router();



// app.use('/.netlify/functions/app',router)

// module.exports.handeler = serverless(app);
app.listen(process.env.PORT || 5000,()=>{
    console.log("Listening on port 5000");
})