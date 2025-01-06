const CourseModel=require('../Models/course');
class CourseController {
    static createCourse=async(req,res)=>{
      try{
        // console.log(req.body);
        const {id} = req.udata
        const {name,email,phone,dob,address,gender,education,course}=req.body;
        
        await CourseModel.create({
          name,
          email,
          phone,
          dob,
          address,
          gender,
          education,
          course,
          user_id:id
        });
        res.redirect('/courseDisplay')

      }
      catch (error) {
        console.log(error);
      }
    }
    static courseDisplay=async(req,res)=>{
      try{
        const {id,name,image} = req.udata
        const course = await CourseModel.find({user_id:id});
        //console.log(course);
        res.render('course/display',{c:course,n:name,i:image})
        // res.send("display")
      }
      catch{
        console.log(error);
      }
    }
     
}
module.exports = CourseController;
  