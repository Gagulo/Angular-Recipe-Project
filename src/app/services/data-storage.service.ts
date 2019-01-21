import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';


import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipe() {
    const token = this.authService.getIdToken();

    return this.http.put('https://angular-recipe-app-71500.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipe() {
    const token = this.authService.getIdToken();

    this.http.get('https://angular-recipe-app-71500.firebaseio.com/recipes.json?auth=' + token).pipe(map(
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
