import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    } 
    catch(err) {
        console.log("Error while conncting")
        console.log(err);
    }
}

export default connectToDB;
