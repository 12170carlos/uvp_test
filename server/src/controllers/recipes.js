const { pool } = require('../../connection');


const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await pool.query('SELECT * FROM recipes');
    res.json(allRecipes.rows);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  const { name, price, description, image_url, timeOfdeliver,
    rating } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO recipes (name, price, description, image_url, timeOfdeliver, rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, price, description, image_url, timeOfdeliver, rating]
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

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe
}