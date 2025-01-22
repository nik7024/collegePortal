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
        res.render('course/display',{c:course,n:name,i:image,msg:req.flash('success')})
        // res.send("display")
      }
      catch{
        console.log(error);
      }
    }
    static viewCourse=async(req,res)=>{
      try{
        const {name,image} = req.udata
        const id = req.params.id
        //console.log(id)
        const course = await CourseModel.findById(id);
        //console.log(course);
        res.render('course/view',{c:course,n:name,i:image})
      } catch (error) {
        console.log(error);
      }
    }
    static editCourse=async(req,res)=>{
      try {
        const {name,image} = req.udata
        const id = req.params.id
        //console.log(id)
        const course = await CourseModel.findById(id)
        res.render('course/edit',{c:course,n:name,i:image})
      } catch (error) {
        console.log(error);
      }
    }
    static courseUpdate=async(req,res)=>{
      try {
        
        const id = req.params.id
        //console.log(id)
        const {name,email,dob,phone,address,gender,education,course}=req.body;
        await CourseModel.findByIdAndUpdate(id,{
          name,
          email,
          phone,
          dob,
          address,
          gender,
          education,
          course

        })
        req.flash("success","Course Update Successfully");
        res.redirect("/courseDisplay");
        
      } catch (error) {
        console.log(error);
      }
    }
    

    static deleteCourse=async(req,res)=>{
      try {
        const {name,image} = req.udata
        const id = req.params.id
        //console.log(id)
        const course = await CourseModel.findByIdAndDelete(id);
        res.redirect('/courseDisplay')
      } catch (error) {
        console.log(error);
      }
    }

    

     
}
module.exports = CourseController;
  