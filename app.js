const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:8000/contact');
};

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
    message: String
});
const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({ name: 'contact' });
console.log(contact.name); 

const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', "pug"); // setting template engine as pug
app.set("views", path.join(__dirname, 'views')); // set the views directory

// ENDPOINTTS
app.get("/", (req, res)=>{
    res.status(200).render("home.pug"); 
})

app.get("/books", (req, res)=>{
    res.status(200).render("books.pug"); 
})

app.get("/contact", (req, res)=>{
    res.status(200).render("contact.pug"); 
})
app.post("/contact", (req, res)=>{
    const contactData = new Contact(req.body);
    contactData.save().then(()=>{
        res.send("The information has been saved to the Database...")
    }).catch(()=>{
        res.status(400).send("The information has been saved to the Database...")
    });
});

// STARTING SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});