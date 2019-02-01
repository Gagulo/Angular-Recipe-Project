import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
    recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Test Recipe', 'test description1',
    'http://recetasamericanas.com/wp-content/uploads/2011/11/5076901518_69539dff50_z.jpg',
    [
      new Ingredient('French Fries', 1),
      new Ingredient('Tomatos', 2)
    ]),
    new Recipe('Test Recipe Two', 'test description2',
    'https://www.publicdomainpictures.net/pictures/110000/velka/burger.jpg',
    [
      new Ingredient('Buns', 1),
      new Ingredient('Meat', 1)
    ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
        return {
            ...state,
            recipes: [...action.payload]
        };
        case (RecipeActions.ADD_RECIPE):
        return {
            ...state,
            recipes: [...state.recipes, action.payload]
        };
        case (RecipeActions.UPDATE_RECIPE):
        const recipe = state.recipes[action.payload.index];
        const updatedRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[action.payload.index] = updatedRecipe;
        return {
            ...state,
            recipes: recipes
        };
        case (RecipeActions.DELETE_RECIPE):
        const oldRecipes = [...state.recipes];
        oldRecipes.splice(action.payload, 1);
        return {
            ...state,
            recipies: oldRecipes
        };
        default:
        return state;
    }
}
