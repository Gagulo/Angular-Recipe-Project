import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor() { }

  private recipes: Recipe[] = [
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
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
 }
