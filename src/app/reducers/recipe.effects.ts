import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../reducers/recipe.actions';
import { Recipe } from '../recipes/recipe.model';
import * as fromRecipe from '../reducers/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        'https://angular-recipe-app-71500.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(
        (recipes) => {
        for (const recipe of recipes) {
            if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
            }
        }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );
  @Effect({dispatch: false})
    recipeStore = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://angular-recipe-app-71500.firebaseio.com/recipes.json', state.recipes,
        {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
