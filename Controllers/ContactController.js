const ContactModel = require('../Models/contact');
class ContactController {
    static createContact = async (req, res) => {
        try {
            console.log(req.body)
            const { id } = req.udata
            const { Firstname, Lastname, Username, Email, Address, Address2, Phone, Country, State,  } = req.body;

            await ContactModel.create({
                Firstname,
                Lastname,
                Username,
                Email,
                Address,
                Address2,
                Phone,
                Country,
                State,
                
            })
            res.redirect('/contactDisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    static contactDisplay = async (req, res) => {
        try {
            const { id, Firstname } = req.udata
            const contact = await ContactModel.find({ user_id: id });
            console.log(contact)
            res.render('contact/display', { c: contact, n:Firstname, s:Lastname, msg: req.flash('success') })
            res.send("display")
        }
        catch {
            console.log(error);
        }
    }
}
module.exports = ContactController;