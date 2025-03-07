import mongoose from "mongoose";

const connections = {};

export const DataBaseConnection = async () => {
  if (connections.isConnected) {
    console.log("Already connected with DateBase ");
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MONGO_DB_URI);
    connections.isConnected = database.connections[0].readyState;
    console.log("Connected with DataBase ,Successfully...");
  } catch (error) {
    console.log(`${error}::Failed to coonect Datebase`);
  }
};
