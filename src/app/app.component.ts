import { Component } from '@angular/core';
import { ThemeService } from "src/app/theme/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sample Project';

  constructor( 
    private themeService: ThemeService,
    ){}

    ngOnInit() {
      this.themeService.setLightTheme();
    }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
