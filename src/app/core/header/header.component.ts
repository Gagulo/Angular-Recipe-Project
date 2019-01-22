import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorage.storeRecipe().subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.dataStorage.getRecipe();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
