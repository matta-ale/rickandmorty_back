const { Favorite, User } = require('../DB_connection');

const postFav = async (req, res) => {
  const { id, name, origin, status, image, species, gender, userId } = req.body;
  if ((!id, !name || !origin || !status || !image || !species || !gender)) {
    res.status(401).send('Faltan datos');
  } else {
    try {
      const [newFav, created] = await Favorite.findOrCreate({
        where: { id },
        defaults: { name, origin, status, image, species, gender },
      });

      await newFav.addUser(userId);
      const user = await User.findByPk(userId, {
        include: Favorite,
      });
      const favorites = user.Favorites;
      res.status(201).send(favorites);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

module.exports = postFav;
