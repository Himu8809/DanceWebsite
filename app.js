//lecture 75,76,77,78,79
const express = require("express");

const path = require("path");


// making express app 
const app = express();


// getting-started.js
const mongoose = require('mongoose');
//initialise body-parser for save data
const bodyparser =require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// on which port you want to run app
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

// converting schema into model
  const contact = mongoose.model('contact', contactSchema);
  


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // for serving static files, app.use('url' express.static('folder'))
// it help to come data fill by user in form to express 
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');  // set the template engine as pug(pug is a type of template engine )
app.set('views', path.join(__dirname, 'views')); // set the views directory of template

//ENDPOINTS
app.get('/', (req, res) => {
    
    const parans = {  }
    res.status(200).render('home.pug', parans);
});
app.get('/contact', (req, res) => {
    
    const parans = {  }
    res.status(200).render('contact.pug', parans);
});
// making post request so that any when give post then data will save in miongo d and for this wwe have to install body-parser
app.post('/contact', (req, res) => {
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("this data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item has been not saved into database")
    })
//     res.status(200).render('contact.pug');
})

// START THE SERVER
//tell that on which port ypou want to listen  and it take a call back("()=>")
app.listen(port, () => {
    console.log(`the application started sucessfully on port ${port}`);
});


// lecrure 80
// what is MONGO DB?
//ans-no sql database
    //- document oriented
       // mean of document oriented 
       
    //Open-source, cross-platform, document-oriented database written in c++
    //salient feature
        //. develop faster
        //.deploy easier
        //.scale bigger
    //mongi Db development started  in 2007
    // mongo Db 2.4.9  was the latest and stable version-releasedom jan 10, 2014
 
// there is difference between mongo and mongo db
   //when we work in mongo then there data is shown in mongo db(data base)