const {User} = require('../DB_connection')


const postUser = async(req,res) => {
    const  {email,password} = req.body
    if(!email || !password) {
        res.status(400).send('Faltan datos')
    } else {
        try {
          const [newEmail,created] = await User.findOrCreate({
            where: { email:email },
            defaults: {password:password}
          })
              if (created) {
                res.status(201).json(newEmail)
              } else {
                res.status(200).send('Usuario ya existente')
              }
        } catch(error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = postUser