const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const reviewCollection = client.db("adornment").collection("reviews");
        
        // service data
        app.get('/services', async(req, res)=>{
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

        // review data

        app.get('/reviews', async(req, res)=>{
            const cursor = reviewCollection.find({})
            const reviews = await cursor.toArray()
            res.send(reviews)
        })

        app.post('/reviews', async(req, res)=>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })

        app.get('/my-reviews', async(req, res)=>{
            let query = {}
            if(req.query.email){
                query ={
                    reviewUserEmail: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const myReviews = await cursor.toArray();
            res.send(myReviews);
        })

        app.delete('/reviews/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query)
            res.send(result)
        })

        app.patch('/reviews/:id', async(req, res) => {
            const id = req.params.id
            const text = req.body.reviewText
            const query = {_id: ObjectId(id)}
            const updatedDoc ={
                $set:{
                    reviewText: text
                }
            }
            const result = await reviewCollection.updateOne(query, updatedDoc)
            res.send(result)
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