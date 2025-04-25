const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://yash123:yash@cluster0.onbzt.mongodb.net/my_app?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
