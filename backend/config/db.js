import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await main();
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/food-del');
}
