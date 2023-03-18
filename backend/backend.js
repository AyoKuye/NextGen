
const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://nextgen:<password>@cluster0.btngql0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


          



const app = express();

const databasename = "NextGen"
const database = client.db(databasename)
const collection = database.collection('Users');



app.post('/api/signup/', async(req, res) => {
    const username = req.data.username
    const userid = req.data.userid
    const password = req.data.password

    const searchingUser = collection.findOne({userid: userid})

    if(!searchingUser){
        collection.insertOne({ username: username, userid: userid, password: password }, function(err, result) {
            if(err) {
              console.log(err);
            } else {
              console.log("Inserted document successfully");
            }
        })
    }

    





})

app.post('/api/login/', async(req, res) => {
    const userid = req.data.userid
    const password = req.data.password

    const searchingUser = collection.findOne({userid: userid})
    const decrypedPassword = searchingUser.password

    if (password == decrypedPassword) {
        res.send(userid) 
    } else {
        res.status(400).send({ error: { message: "incorrect password" } }) 
    }
})



// Connect to MongoDB



          
     
    // Start server
client.connect().then(() => {
    console.log("MongoDB successfully connected")
    app.listen(port, () => console.log("..."));
    }).catch((err) => {
    console.log("Got this error", err)
    })
