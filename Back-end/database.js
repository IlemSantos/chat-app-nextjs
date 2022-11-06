import mongoose from 'mongoose';

const local = process.env.MONGODB_LOCAL;

(async () => {
    try {
        const db = await mongoose.connect(local);
        console.log("MongoDB connect: " + db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();