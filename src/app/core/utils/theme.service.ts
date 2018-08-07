import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public isDarkTheme: boolean;

  constructor(public overlayContainer: OverlayContainer, private storage: StorageService) { 
    this.isDarkTheme = this.storage.get('isDarkTheme') || false;
    if (this.storage.get('isDarkTheme')) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    }
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.storage.set('isDarkTheme', true);
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.storage.set('isDarkTheme', false);
    }   
  }
}
