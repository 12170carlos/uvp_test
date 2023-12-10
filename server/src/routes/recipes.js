
const { Router } = require('express');
const { getAllRecipes, getRecipe, createRecipe } = require('../controllers/recipes');
const router = Router();


router.post('/', createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipe)

module.exports = router;