const mongoose = require("mongoose");
const fs = require("fs");

const envContent = fs.readFileSync(".env", "utf8");
let uri = "";
envContent.split("\n").forEach(line => {
  if (line.startsWith("MONGODB_URI=")) {
    uri = line.substring("MONGODB_URI=".length).trim();
  }
});

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB!");
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:", collections.map(c => c.name));
  
  const events = await mongoose.connection.db.collection("events").find({}).toArray();
  console.log("Current Event count:", events.length);
  events.forEach(e => {
    console.log(`- [${e.date}] (${e.day || ''}) ${e.time || ''} : ${e.event}`);
  });
  await mongoose.disconnect();
}

run().catch(console.error);
