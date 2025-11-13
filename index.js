const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app=express()
const port=process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://SocialeventDB:SstreCNaivys9LuO@myfirst-cluster.32i1hy9.mongodb.net/?appName=myfirst-cluster";

         app.get('/', (req,res)=>{
             res.send("Impactify Server Is Running")
         })

                const client = new MongoClient(uri, {
                 serverApi: {
                 version: ServerApiVersion.v1,
                 strict: true,
                 deprecationErrors: true,
           }
         });
async function run() {
    try{
          await client.connect();

          const db=client.db('eventDb')
          const eventCollaction=db.collection('event')

          app.get('/event', async(req,res)=>{
             const today = new Date();
             const query = { event_date: { $gte: today } };
             const cursor = eventCollaction.find(query).sort({ event_date: 1 });
             const result = await cursor.toArray();
             res.send(result);
          })

          app.get('/event-details/:id', async(req,res)=>{
            const id = req.params.id
            const query={_id: new ObjectId(id)}
            const result= await eventCollaction.findOne(query)
            res.send(result)
          })


          app.post('/event', async(req,res)=>{
               const data = req.body
               data.event_date = new Date(data.event_date);
               const result = await eventCollaction.insertOne(data)
               res.send(result)
          })

     
           await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
app.listen(port ,()=>{
    console.log(`Impactify Server Running On Port:${port}`)
})

run().catch(console.dir);