import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';


import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService) {}

  storeRecipe() {
    return this.http.put('https://angular-recipe-app-71500.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipe() {
    this.http.get('https://angular-recipe-app-71500.firebaseio.com/recipes.json').pipe(map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
