const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();
// console.log(process.env)


const app = express();
const port =process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojutr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
try{
    await client.connect();
    const database = client.db("CarMechanic");
    const servicesCollection = database.collection('services');

// GET API
app.get('/services', async (req,res)=>{
    const cursor = servicesCollection.find({});
    const services = await cursor.toArray();
    res.send(services)
})

//Get single service
app.get('/service/:id', async(req, res)=>{
    const id = req.params.id;
    console.log('getting specific service', id)
    const query = {_id: ObjectId(id)}
    const service = await servicesCollection.findOne(query);
    res.json(service)
})

    // POST API 
    app.post('/services', async(req, res)=>{
        const service = req.body;
        console.log('hit the post api', service)

         const result = await servicesCollection.insertOne(service);
         console.log(result)
        //  res.send('post hitted')
        res.json(result)
    })

}
finally{
    // await client.close();
}
}
run().catch(console.dir);

// user:geneius1
//password:1245768rty

// const app = express();
// const port = 5000;

app.get('/', (req, res)=>{
    res.send('Running genius server');
});

app/get ('/hello', (req, res)=>{
    res.send('hello update here')
})

app.listen(port,()=>{
    console.log('Running genius server on port', port)
})