const mongoose = require("mongoose");
const uri = "mongodb+srv://suryakanta514:0bWBeCnnz8TpvS4H@cluster0.psc34.mongodb.net/pingua_mahotsav";

async function check() {
  await mongoose.connect(uri);
  const count = await mongoose.connection.collection("participants").countDocuments();
  const latest = await mongoose.connection.collection("participants").findOne({}, { sort: { createdAt: -1 } });
  console.log("Total Count in Database:", count);
  console.log("Latest Submitted Participant:", JSON.stringify(latest, null, 2));
  process.exit(0);
}

check();
