const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Adornment Server is Running...')
})

const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.1uor19o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const serviceCollection = client.db("adornment").collection("services");
    
        app.get('/services', async(req, res)=>{
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async(req, res)=>{
            const id = parseInt(req.params.id)
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            const service = services.find(service => service.id === id)
            res.send(service)
        })
    }
    finally{}
}

run().catch(err=> console.error(err))



// app.post('/users', async(req, res)=>{
//     const user = req.body;
//     const result = await userCollection.insertOne(user)
//     users.push(user)
//     res.send(user)
// })

app.listen(port, ()=>{
    console.log(`Adornment server is running on port: ${port}`);
})