import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingService, Preferences } from 'src/app/services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  preferences: Preferences;
  private _subscription: Subscription;

  constructor(private _settingService: SettingService) { 
    this._subscription = _settingService.onPreferenceChange().subscribe((newPreferences) => {
      this.preferences = newPreferences;
    });
  }

  ngOnInit(): void {
    this.preferences = this._settingService.getPreferences();
  }
  
  toggleDarkMode() {
    this.preferences.dark_mode = !this.preferences.dark_mode;
    this._settingService.setPreferences(this.preferences);
  }

  toggleHighContrastMode() {
    this.preferences.high_contrast_mode = !this.preferences.high_contrast_mode;
    this._settingService.setPreferences(this.preferences);
  }

}
