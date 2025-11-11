const express = require('express');
const cors = require('cors');

const app=express()
const port=process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Impactify Server Is Running")
})

async function run() {
    try{
          
    }
    finally{

    }
}
app.listen(port ,()=>{
    console.log(`Impactify Server Running On Port:${port}`)
})

run().catch(console.dir);