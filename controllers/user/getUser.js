const { User } = require('../../models/user')

module.exports = async(req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send('User does not exist')
        }
        return res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profileImage: user.profileImage
        })
    } catch(error) {
        return res.status(400).send(error)
    }
}