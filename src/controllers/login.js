const {User} = require('../DB_connection')

const login = async (req,res) => {
    const {email,password} = req.query

    if(!email || !password) {
        res.status(400).send('Faltan datos')
    } else {
        try {
            const user = await User.findOne({where:{email}})
            if (user===null) {
                res.status(404).send('Usuario no encontrado')
            } else {
                if (user.password!==password) {
                    res.status(403).send('Contraseña incorrecta')
                } else {
                    const {id} = user.get({ plain: true })
                    res.status(200).json({userId: id,access: true})
                }
            }
        } catch(error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = login;