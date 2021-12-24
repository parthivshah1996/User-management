const { User } = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = async(req, res) => {
    try{
        if (!req.body) {
			throw new StatusCodeError(400, 'POST body should not be empty')
		}
        let userDetails = Object.assign({},req.body)
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send('User does not exist')
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            const salt = await bcrypt.genSalt(10)
            userDetails.password = await bcrypt.hash(req.body.password, salt)
        }
        if(req.file){
            userDetails.profileImage = req.file.filename
        }
        await User.updateOne(
            { _id: req.params.id},
            userDetails
          )
          
        return res.status(201).send('Updated Successfully')
        
    } catch(error){
        return res.status(400).send(error)
    }
}