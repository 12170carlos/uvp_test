

const { pool } = require('./connection.js');
const server = require('./app.js')


// const { Recipe } =  require('./src/db');
// const {loadDiets} = require('./src/controllers/diets.js')
// const { defaults } =  require('pg');
// const { loadRecipes } = require('./src/controllers/recipes.js');
// const { API_KEY } = process.env;





pool.connect()
  .then(() => {
    // Realizar operaciones de carga o inicialización de datos
    // loadRecipes();
    // loadDiets();

    // Iniciar el servidor
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });
  
