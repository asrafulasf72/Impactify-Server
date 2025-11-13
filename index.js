const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
             const cursor= eventCollaction.find()
             const result= await cursor.toArray()
             res.send(result)
          })


          app.post('/event', async(req,res)=>{
               const data = req.body
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