module.exports = (mongoose) => {
  var url =
    "mongodb+srv://princeinder:prince123@cluster0.lbs8d.mongodb.net/projectideas?retryWrites=true&w=majority";
  mongoose.Promise = global.Promise;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
};
