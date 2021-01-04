import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { dark, light } from './theme/theme';
import { ThemeService } from './theme/theme.service';

describe('AppComponent', () => {
  let themeService:ThemeService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Sample Project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Sample Project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar span').textContent).toContain('Sample Application');
  });

  it('should change theme to dark theme on button click', () => {
    const themeService: ThemeService = TestBed.get(ThemeService);
    let component = new AppComponent(themeService);

    themeService.setActiveTheme(light);
    component.toggleTheme();

    expect(themeService.getActiveTheme()).toEqual(dark);

  });

  it('should change theme to light theme on button click', () => {
    const themeService: ThemeService = TestBed.get(ThemeService);
    let component = new AppComponent(themeService);

    themeService.setActiveTheme(dark);
    component.toggleTheme();

    expect(themeService.getActiveTheme()).toEqual(light);

  }); 
});
