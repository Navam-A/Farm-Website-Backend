let mongoose = require("mongoose");

let connection = mongoose.connect("mongodb+srv://navamajabale05:IIFgYMqyi3lDUcBg@cluster0.qm8sg38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

if (connection) {
    console.log("DB Connected");
} else if (mongoose.Error) {
    console.log(mongoose.Error);
}