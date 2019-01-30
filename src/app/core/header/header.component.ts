import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../services/data-storage.service';
import * as fromApp from '../../reducers/app.reducers';
import * as fromAuth from '../../reducers/auth.reducers';
import * as AuthActions from '../../reducers/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorage: DataStorageService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorage.storeRecipe().subscribe((response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.dataStorage.getRecipe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
