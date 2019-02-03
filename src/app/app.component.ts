import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCyrdPZxyjgUoahb77RhY5-U2NdEuvf5ZQ',
      authDomain: 'angular-recipe-app-71500.firebaseapp.com',
    }) ;
  }
}
