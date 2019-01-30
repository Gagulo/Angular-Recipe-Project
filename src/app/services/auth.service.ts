import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as firebase from 'firebase/app';
import * as fromApp from '../reducers/app.reducers';
import * as AuthActions from '../reducers/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (
      user => {
        this.store.dispatch(new AuthActions.Singup());
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token));
            }
          );
      }
    )
      .catch(
        error => console.log(error)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Singin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token));
            }
          );
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
