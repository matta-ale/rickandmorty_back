const {Favorite,User} = require('../DB_connection')

const getFav = async (req,res) => {
    const {userId} = req.params
    console.log('User Id: ' + userId);
    try {
        const user = await User.findByPk(userId, {
            include: Favorite,
          });
        console.log(user.Favorites);
        const favorites = user.Favorites
        res.status(200).send(favorites)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

module.exports = getFav;