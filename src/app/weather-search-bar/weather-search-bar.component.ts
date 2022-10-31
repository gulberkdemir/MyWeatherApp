import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-weather-search-bar',
  templateUrl: './weather-search-bar.component.html',
  styleUrls: ['./weather-search-bar.component.scss']
})
export class WeatherSearchBarComponent{

  searchText = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  onClickCleanBtn() {
    this.searchText = '';
  }

  onKeyPress(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      const city = e.target.value;
      this.searchService.searchResult.next(city);


      this.router.navigate([`/${city}`]);
      this.searchText = '';
    }
  }

}
