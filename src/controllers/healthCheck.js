const PORT = process.env.PORT
const healthCheck = async (req,res) => {
    res.status(200).send('Server raised on port '+ PORT)
}

module.exports = healthCheck;