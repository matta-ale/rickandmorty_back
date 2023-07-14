const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const fullfilled = (response, res) => {
    if (!response.data.id) {
    // res.writeHead(404,{"Content-Type":'text/plain'})
    // res.end('Not found')
    res.status(404).send('Not found');
    return res;
  } else {
    const { id, name, gender, species, origin, image, status } = response.data;
    const charObj = {
      id: id,
      name: name,
      gender: gender,
      species: species,
      origin: origin,
      image: image,
      status: status,
    };
    res.status(200).json(charObj);
    return res;
  }
};

async function getCharById(req, res) { //ver cómo manejar errores en la captura getCharById.jpg, en carpeta server
  const { id } = req.params;
  try {
    const response = await axios.get(URL + id);
    return fullfilled(response, res);
  } catch (error) {
    return res.status(error.response.status).send(error.message);
  }
}


module.exports = getCharById;
