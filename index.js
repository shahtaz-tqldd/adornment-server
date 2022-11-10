const express = require('express');
const app = express();
const cors = require('cors');
const services = require('./services.json');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.1uor19o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("adornment").collection("services");
  // perform actions on the collection object
  console.log('inside collections')
});


app.get('/', (req, res)=>{
    res.send('Adornment Server is Running...')
})
app.get('/services', (req, res)=>{
    res.send(services)
})

app.get('/services/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const service = services.find(service => service.id === id)
    res.send(service)
})

app.listen(port, ()=>{
    console.log(`Adornment server is running on port: ${port}`);
})