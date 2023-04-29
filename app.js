const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})