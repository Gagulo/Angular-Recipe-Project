import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipe() {

    /* return this.httpClient.put('https://angular-recipe-app-71500.firebaseio.com/recipes.json',
     this.recipeService.getRecipes(), {
       params: new HttpParams().set('auth', token)
     }); */
     const req = new HttpRequest('PUT', 'https://angular-recipe-app-71500.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
     {reportProgress: true});
     return this.httpClient.request(req);
  }

  getRecipe() {

    this.httpClient.get<Recipe[]>('https://angular-recipe-app-71500.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(map(
      (recipes) => {
        for (const recipe of recipes) {
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
