const express=require('express');
const app=express();
require('dotenv/config')

const cors =require('cors');
const {default:mongoose} = require('mongoose');

app.use(cors({ origin: true}));
app.use(express.json());


app.get('/', (req, res) => {
    return res.json('Hai There...')
})
    
//user authentication route
const userRoute=require('./routes/auth');
app.use('/api/users/',userRoute);   

// Artist Routes
const artistRoutes=require('./routes/artist');
app.use('/api/artists/',artistRoutes);

//Album Routes
const albumRoutes=require('./routes/albums');
app.use('/api/albums/',albumRoutes);

//Songs Routes
const songsRoutes=require('./routes/songs');
app.use('/api/songs/',songsRoutes);

 

mongoose.connect("mongodb+srv://alexxan749A:8DSvMhV0hZOQhr1x@musicapp.qigiqft.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});
mongoose.connection 
.once("open",()=> console.log('conectado'))
.on("error",(error)=>{console.log(`ERROR:${error}`);})
 
app.listen(4000, ()=>console.log('Listening to port 4000'))
 