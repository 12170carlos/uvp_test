const { pool } = require('../../connection');



const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await pool.query('SELECT * FROM recipes');

    // Modificar cada receta para incluir la URL de la imagen alternativa en caso de error al cargar la imagen
    
    res.status(200).json(allRecipes.rows);
    
  } catch (error) {
    next(error);
  }
};



const createRecipe = async (req, res, next) => {
  const { name, price, description, image_url, timeOfdeliver,
    rating, condition, discount_percentage } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO recipes (name, price, description, image_url, timeOfdeliver, rating, condition, discount_percentage) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [name, price, description, image_url, timeOfdeliver, rating, condition, discount_percentage]
      );
      res.json(result.rows[0])
      
    } catch (error) {
      next(error);
    }
 
};

const getRecipe = async (req, res, next) => {
  const { id } = req.params;
  if(!id){
    res.json({error: 'No id provided'})
  }
 
  try {
    const recipe = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);

    if(recipe.rows.length === 0){
      return res.status(404).json({error: 'No recipe found'});
    }

    return res.json(recipe.rows[0]);
  } catch (error) {
    next(error)
  }

};
const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  if(!id){
    res.json({error: 'No id provided'})
  }
 
  try {
    const recipe = await pool.query('DELETE * FROM recipes WHERE id = $1', [id]);

    if(recipe.rows.length === 0){
      return res.status(404).json({error: 'No recipe found'});
    }

    return res.json(recipe.rows[0]);
  } catch (error) {
    next(error)
  }

};
const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, image_url, timeOfdeliver,
    rating, condition, discount_percentage } = req.body;
  if(!id){
    res.json({error: 'No id provided'})
  }
  
  

  try {
    const recipe = await pool.query('UPDATE recipes SET name = $1, price = $2, description = $3, image_url = $4, timeOfdeliver = $5, rating = $6, condition = $7, discount_percentage = $8 WHERE id = $9 RETURNING *',
    [name, price, description, image_url, timeOfdeliver,
      rating, condition, discount_percentage, id]);

    if(recipe.rows.length === 0){
      return res.status(404).json({error: 'No recipe found'});
    }

    return res.json(recipe.rows[0]);
  } catch (error) {
    next(error)
  }

};



module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
