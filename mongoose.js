const mongoose = require('mongoose');
const connectionURL = process.env.MONGODB_URI

mongoose.connect(connectionURL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', () => console.log("Couldn't connect to MongoDB"));
db.once('open', function() {
  // we're connected!
  console.log("Connected to database")
});

