const express = require('express');
const app = express();
const cors = require('cors');
const services = require('./services.json');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Adornment Server is Running...')
})
app.get('/services', (req, res)=>{
    res.send(services)
})

app.listen(port, ()=>{
    console.log(`Adornment server is running on port: ${port}`);
})