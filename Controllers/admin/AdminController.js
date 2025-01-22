const CourseModel = require('../../Models/course')
class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name, email, image } = req.udata
            res.render('admin/dashboard', { n: name, i: image, e: email })
        }
        catch (error) {
            console.log(error)
        }
    }

    static courseDisplay = async (req, res) => {

        try {
            const { name, email, image } = req.udata
            const course = await CourseModel.find()
            res.render('admin/courseDisplay', { n: name, e: email, i: image, c: course })
        }
        catch (error) {
            console.log(error)
        }

    }

    static update_status = async (req, res) => {
        try {
            const id = req.params.id
            //console.log(id)
            const { name, email, status, comment } = req.body
            await CourseModel.findByIdAndUpdate(id, {
                status,
                comment
            });
            res.redirect('/admin/courseDisplay')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AdminController;