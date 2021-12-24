const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
	try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        
        // Check if this user already exisits
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send('This user already exisits!')
        } else {
            // Insert the new user if they do not exist yet
            user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.file === undefined ? null : req.file.filename
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
            await user.save()
            res.status(201).send('User Created')
        }
    }
    catch(error){
        return res.status(400).send(error)
    }
}