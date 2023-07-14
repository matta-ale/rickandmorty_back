const { Favorite,User } = require('../DB_connection');

const deleteFav = async (req, res) => {
  const { id, userId } = req.params;
  try {
    await Favorite.destroy({
      where: {
        id: id,
      },
    });
    const user = await User.findByPk(userId, {
      include: Favorite,
    });
  const favorites = user.Favorites
  console.log('Fav array: ' + favorites);
  res.status(200).send(favorites)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = deleteFav;
