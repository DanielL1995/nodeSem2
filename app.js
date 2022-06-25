require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Advert = require('./models/advert');
const path = require('path');
const fs = require('fs');





const url = 'mongodb+srv://daniel95l:UicUB97x*KNgKGn@cluster0.xmnay.mongodb.net/?retryWrites=true&w=majority'



app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))

const debug = process.argv[2] = "debug"

// const setNewLog = () =>{
//     return path.join(__dirname,"/log","logs" + ".txt")
// }

// function addtoLogs(message,logs) {
//     fs.appendFile(logs,message, "utf-8", (err)=>{
//         if(err){
//             throw(err);
//         }else{
//             console.log("Saved")
//         }
//     });
// }

// app.use((req,res,next)=>{
// let msg = new Date() + `method: ${req.method} + adress ${req.originalUrl}`;
// if(debug){
//     return addtoLogs( msg, setNewLog);
// }
// next()
// })



//Aktualna data

app.get('/heartbeat', async (req, res) => {
    const time = await new Date().toLocaleString()
    res.send(`Aktualna data  ${time}`);
});

app.get('/alladverts',async(req,res)=>{
    try {
        const allAdverts = await Advert.find()
        res.send(allAdverts)
    }catch (err){
        res.status(404).send(err.message);
    }
})

// Dodawanie user

app.post('/adduser',async (req,res)=>{
    
    const user = new User (req.body);
    await user.save();
    res.status(201).send({user});
})

// Dodawanie ogłoszenia

app.post("/adverts",  async (req, res)=>{

try{
    const advert = new Advert(req.body);
await advert.save();
res.status(201).send(advert)
}catch(err){
    res.status(404).send("cant post")
}
})

// Szukanie pojedynczego ogłoszenia po Id
app.get("/advert:id", async(req,res)=>{
   try{
    const id = req.params.id;
    const advert = await Advert.findById(id);
    res.send(advert)
   }catch (err){
    res.status(404).send(err.message);
   }

})


app.get("/adverts/price/:low/:hight", async(req,res)=>{
    const {low, hight} = req.params;

    const advert = await Advert.where("price")
        .gt(low)
        .lt(hight)

    res.send(advert)
})
// Usuwanie po id 


app.delete("/adverts/delete:id", async (req,res)=>{
    const id = req.params.id;
    
    try{
        
        const advert = await Advert.findByIdAndDelete({_id: id})
        res.status(204).send(advert);
    }catch (err){
        res.status(404).send(err.message)
    }
})



app.use(function(req,res,next){
   if (res.status(404))
    res.sendFile(path.join(__dirname+'/public/index.html'))
    
});


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(response =>{
        app.listen(process.env.PORT, ()=>console.log("Server is started :)")
        )}
    )
    .catch(err =>{
        console.log(err)
    })


    




