const mongoose = require('mongoose')

const connectingfunction = async ()=>{
    try{
       await mongoose.connect(`${process.env.URI}`);
       console.log("connected to DB successfully")
    }catch(err){
        console.log("error ihgn consdfnecting"+err);
    }
}

connectingfunction();