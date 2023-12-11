
const { Router } = require('express');
const { getAllRecipes, getRecipe, createRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipes');
const router = Router();


router.post('/', createRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.delete('/:id', deleteRecipe);

router.put('/:id', updateRecipe)

module.exports = router;