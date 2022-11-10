const express = require('express');
const app = express();
const cors = require('cors');
const services = require('./services.json');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

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