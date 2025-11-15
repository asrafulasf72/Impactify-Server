const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()

const app=express()
const port=process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@myfirst-cluster.32i1hy9.mongodb.net/?appName=myfirst-cluster`;

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
          // await client.connect();

          const db=client.db('eventDb')
          const eventCollaction=db.collection('event')
          const joinEventCollaction=db.collection('joinEventDB')

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

          app.get('/manage-events', async(req,res)=>{
              const email=req.query.email
              const result= await eventCollaction.find({created_by: email}).toArray()
              res.send(result)
          })

          app.get('/join-events', async(req,res)=>{
              const email=req.query.email
              const cursor = joinEventCollaction.find({userEmail: email}).sort({eventDate: 1})
              const result = await cursor.toArray()
              res.send(result)
          })

          app.get('/event/:id', async(req,res)=>{
               const id= req.params.id
               const query={_id: new ObjectId(id)}
               const result = await eventCollaction.findOne(query)
               res.send(result)
          })
          app.put('/update-event/:id', async(req,res)=>{
              const id=req.params.id
              const data= req.body

                if(data.event_date){
                    data.event_date = new Date(data.event_date)
                }

              const query={_id: new ObjectId(id)}

              const UpdateData={
                $set: data
              }
              const result= await eventCollaction.updateOne(query, UpdateData)
              res.send(result)
          })

        //   Search and Filtering Api 
        app.get('/search-events', async(req,res)=>{
           const {search="", type="All"}= req.query
           const today = new Date();

           const query ={event_date: {$gte: today}}

           if(search){
            query.title={ $regex: search, $options: "i"}
           }

           if(type !== "All"){
            query.eventType=type;
           }

           const result= await eventCollaction.find(query).sort({event_date: 1}).toArray()
           res.send(result)
        })


          app.post('/event', async(req,res)=>{
               const data = req.body
               data.event_date = new Date(data.event_date);
               const result = await eventCollaction.insertOne(data)
               res.send(result)
          })

          app.post('/join-event', async(req,res)=>{
                const data=req.body

                const existing = await joinEventCollaction.findOne({eventTitle: data.eventTitle,  userEmail:data.userEmail})
                if(existing){
                    return res.send({message: "Already joined"})
                }
                const result= await joinEventCollaction.insertOne(data)
                res.send(result)
          })

     
          //  await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
app.listen(port ,()=>{
    console.log(`Impactify Server Running On Port:${port}`)
})

run().catch(console.dir);