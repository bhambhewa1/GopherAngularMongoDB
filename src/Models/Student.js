const mongoose = require("mongoose");
const validator = require('validator');
const ErrorController = require("../Controllers/Middlewares/ErrorController");

const userSchema = new mongoose.Schema({
   firstname: {type: String, required: true},
   lastname: {type: String, required: true},
   dob: {type: Date, required: true},
   email: {type: String, validate: [validator.isEmail, 'Enter a valid email address.'], required: true, unique: true},
   phone: {type: Number, required: true},
   anniversary: {type: Date, required: true},
   password: {type: String, required: true},
   useremailotp: {type: String},
   createduseremailotp: {type: Date},
   loginemailotp: {type: String},
   loginphoneotp: {type: String}
   // confirm_password: {type: String, required: true}
});

 var userModel = mongoose.model("Users", userSchema);
 

module.exports = {userModel};






// age: {type: Number, min: 18, max:35, required: true, validate: {
//     validator: function(el){
//        return (el>=18 && el<=35)},
//        message: 'Enter a valid age from 18 to 35.'}
//    },
// image: {type: Buffer, required: true, validate: {
//  validator: function(el){
//      return (el !== "")},
//      message: 'Enter a valid image'}
// }
// // Making Schema...............
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, min: 18, max: 58, required: true },
//   hobbies: { type: Array },
//   isactive: { type: Boolean },
//   comment: [
//     { value: { type: String }, publish: { type: Date, default: Date.now } },
//   ],
//   join: { type: Date, default: Date.now },
// });

// // Compiling Schema by using model................
// const studentModel = mongoose.model("student", studentSchema);

// // creating and saving document...............
// // const createDOC = async () => {
// //   try {
// //     //creating document which is store in collection in database
// //     const studentDOC = new studentModel({
// //       name: "Ashish",
// //       age: 25,
// //       hobbies: ["dancing", "learning", "reading"],
// //       isactive: true,
// //       comment: [{ value: "This is a comment on mongoose" }],
// //     });
// //     //saving document
// //     const result = await studentDOC.save();
// //     console.log(result);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // Fetching data from database............
// // const getAllDOC = async () => {
// //   try {
// //     // const result = await studentModel.find({}, null, {skip:2});
// //     // const result = await studentModel.find().countDocuments();
// //     const result = await studentModel.find({age: {$in: [24,26]}});
// //     console.log(result);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // Updating document and if not find, upsert will insert...........
// // const updateDOC = async () => {
// //   try {
// //     // const result = await studentModel.updateOne({age: 26}, {name: 'Kamal'}, {upsert:true});
// //     const result = await studentModel.updateMany({age: 29}, {name: 'rani'}, {upsert:true});
// //     console.log(result);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // Deleting single document and many................
// const deleteDOC = async () => {
//   try {
//     const result = await studentModel.deleteMany({age: 29});
//     // const result = await studentModel.updateMany({age: 29}, {name: 'Mohan Aggarwal'}, {upsert:true});
//     console.log(result);
//     console.log(await studentModel.find().countDocuments())
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = deleteDOC;
