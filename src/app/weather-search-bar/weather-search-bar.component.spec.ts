import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSearchBarComponent } from './weather-search-bar.component';

describe('WeatherSearchBarComponent', () => {
  let component: WeatherSearchBarComponent;
  let fixture: ComponentFixture<WeatherSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
