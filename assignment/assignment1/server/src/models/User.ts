class User {
  // username: String;
  // password: String;
  // isAdmin: Boolean;

  // constructor(username: String, password: String, isAdmin: Boolean) {
  //   this.username = username;
  //   this.password = password;
  //   this.isAdmin = isAdmin;
  // }
}

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       min: 2, 
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 5,
//     },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
//     // picturePath: {
//     //   type: String,
//     //   default: "",
//     // },
//     // questions: {
//     //   type: Array,
//     //   default: [],
//     // },
//   }, {timestamps: true}
// );

// const User = mongoose.model("User", userSchema);
export default User;
