import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService) {}

  onSaveData() {
    this.dataStorage.storeRecipe().subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.dataStorage.getRecipe();
  }
}
