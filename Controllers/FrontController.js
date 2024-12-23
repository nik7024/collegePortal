const UserModel = require("../Models/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

class FrontController {
  static home = async (req, res) => {
    try {
      res.render("home");
    } catch {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render("about");
    } catch {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      res.render("login", { msg: req.flash("success") });
    } catch {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") }); // here msg is the variable that stores the message
    } catch {
      console.log(error);
    }
  };
  //user insert
  static userinsert = async (req, res) => {
    try {
      //    console.log(req.files.image)

      //     console.log(req.body)
      const { name, email, password, confirmpassword } = req.body;
      if (!name || !email || !password || !confirmpassword) {
        req.flash("error", "All fields are required.");
        return res.redirect("/register");
      }
      const isEmail = await UserModel.findOne({ email });
      if (isEmail) {
        req.flash("error", "Email Already Exists.");
        return res.redirect("/register");
      }
      if (password != confirmpassword) {
        req.flash("error", "Password does not match.");
        return res.redirect("/register");
      }
      // upload image
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const hashpassword = await bcrypt.hash(password, 10);
      const data = await UserModel.create({
        name,
        email,
        password: hashpassword,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      req.flash("success", "Register Successfully ! Please login here");
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
