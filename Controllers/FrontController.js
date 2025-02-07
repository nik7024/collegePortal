const UserModel = require("../Models/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require('jsonwebtoken');
const CourseModel = require("../Models/course");
const randomstring = require("randomstring")
const nodemailer = require('nodemailer')

class FrontController {
  static home = async (req, res) => {
    try {
      const { name, email, image, id } = req.udata;
      const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
      const bca = await CourseModel.findOne({ user_id: id, course: "bca" });
      const mca = await CourseModel.findOne({ user_id: id, course: "mca" });
      res.render("home", {
        n: name,
        e: email,
        i: image,
        btech: btech,
        bca: bca,
        mca: mca,
        msg: req.flash("error"),
      }); // home.ejs file
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      const { name, image } = req.udata
      res.render("about", { n: name, i: image });
    } catch {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, image } = req.udata
      res.render("contact", { n: name, i: image });
    } catch {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      res.render("login", { msg: req.flash('success'), msg1: req.flash('error') });
    } catch {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error"),verifyMail: req.flash("verifyMail")  }); // here msg is the variable that stores the message
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
      // console.log(isEmail)
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

      if (data) {

        this.sendVerifymail(name, email, data.id)
        req.flash('verifyEmail', 'Your Register Success, Plz verify mail')
        res.redirect('/register')
      } else {
        req.flash('error', 'not found')
        req.redirect('/register')
      }

      req.flash("success", "Register Successfully ! Please login here");
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static sendVerifymail = async (name, email, user_id) => {
    //console.log(name, email, user_id);
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "ns1082003@gmail.com",
        pass: "ztup fzks kycz sgth",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "For Verification mail", // Subject line
      text: "heelo", // plain text body
      html: "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:3000/register/verify?id=' +
        user_id +
        '">Verify</a>Your mail</p>.',

    });
    console.log(info);
  };

  static verifyMail = async (req, res) => {
    try {
      //console.log(req.query.id)
      const updateinfo = await UserModel.findByIdAndUpdate(req.query.id, {
        is_verify: 1,
      });
      console.log(updateinfo)
      if (updateinfo) {
        let token = jwt.sign({ ID: updateinfo.id }, 'jgbd43hnda9a')
        //console.log(token)middleware
        res.cookie('token', token, token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        })
        res.redirect("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //verifyLogin 
  //verifyLogin
  static verifyLogin = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password, } = req.body

        const user = await UserModel.findOne({ email });
        // console.log(user)
        if (!user) {
            req.flash("error", "Your are not register User");
            return res.redirect('/')
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            // console.log(isMatch)
            if (isMatch) {
                if (user.role == 'admin') {
                    // token
                    const token = jwt.sign({ ID: user.id }, 'jgbd43hnda9a')
                    // console.log(token)
                    res.cookie('token', token)
                    return res.redirect('admin/dashboard')


                } else if (user.role == 'student' && user.is_verify == 1) {
                    const token = jwt.sign({ ID: user.id }, 'jgbd43hnda9a')
                    // console.log(token)
                    res.cookie('token', token)
                    return res.redirect('/home')
                }

            } else {
                req.flash('error', "please verify your Email");
                return res.redirect('/')
            }


        }
    } catch (error) {
        console.log(error)

    }
};
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  }

  //profile
  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.udata
      res.render("profile", { n: name, i: image, e: email, message: req.flash("error") })
    } catch (error) {
      console.log(error)
    }
  }
  static changePassword = async (req, res) => {
    try {
      const { id } = req.udata;
      // console.log(req.body);
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.udata;
      const { name, email, role } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        // console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  static forgetPasswordVerify = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await UserModel.findOne({ email: email });
      //console.log(userData)
      if (userData) {
        const randomString = randomstring.generate();
        await UserModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "Plz Check Your mail to reset Your Password!");
        res.redirect("/");
      } else {
        req.flash("error", "You are not a registered Email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email, token) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "ns1082003@gmail.com",
        pass: "ztup fzks kycz sgth",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "heelo", // plain text body
      html: "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:3000/reset_password?token=' +
        token +
        '">Reset</a>Your Password.',

    });
  };

  static reset_Password = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await UserModel.findOne({ token: token });
      console.log(tokenData)
      if (tokenData) {
        res.render("reset_password", { user_id: tokenData._id });
      } else {
        res.render("404");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static reset_Password1 = async (req, res) => {
    try {
      const { password, user_id } = req.body;
      const newHashPassword = await bcrypt.hash(password, 10);
      await UserModel.findByIdAndUpdate(user_id, {
        password: newHashPassword,
        token: "",
      });
      req.flash("success", "Reset Password Updated successfully ");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };


}
module.exports = FrontController;
