const PORT = process.env.PORT || 3001;
const server = require('./server.js')
const {conn} = require('./DB_connection');

conn
    .sync({force:true})
    .then(() => {
        server.listen(PORT, () => console.log('Server raised on port: ' + PORT))
    })
    .catch((err)=> {
        console.log(err);
    })