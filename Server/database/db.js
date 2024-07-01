import mongoose from "mongoose";
// import dotenv from 'dotenv'

// dotenv.config();
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
const Connection = async (username, password) =>
    {
        const URL = `mongodb://${username}:${password}@ac-lap0ebi-shard-00-00.gp199bd.mongodb.net:27017,ac-lap0ebi-shard-00-01.gp199bd.mongodb.net:27017,ac-lap0ebi-shard-00-02.gp199bd.mongodb.net:27017/?ssl=true&replicaSet=atlas-y5kskv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
        try{
           await mongoose.connect(URL, { useUnifiedTopology: true});
           console.log('Database connected successfully')
        }catch(error){
            console.log('Error', error.message);
        }
    }


export default Connection;

