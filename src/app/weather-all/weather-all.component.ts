import {AfterContentChecked, Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {WhetherService} from "./whether.service";
import {Weather} from "./weather.model";
import {interval, Subscription, switchMap, take, timer} from "rxjs";
import {SearchService} from "../weather-search-bar/search.service";
import {GeneralserviceService} from "../shared/generalservice.service";
import {whetherApiConfig} from "../whether-config";
import {ActivatedRoute} from "@angular/router";
import {Forecast} from "./forecast.model";
import {ForecastService} from "./forecast/forecast.service";


@Component({
  selector: 'app-weather-all',
  templateUrl: './weather-all.component.html',
  styleUrls: ['./weather-all.component.scss']
})
export class WeatherAllComponent implements OnInit, OnDestroy {
  private citySubscription: Subscription;
  private _weatherSubscription: Subscription;
  private updateSubscription: Subscription;
  weather: any;
  cityResult: string;
  // @ts-ignore
  weatherModelObject: Weather = new Weather();
  city: string;
  forecastList: any[] = [];
  // @ts-ignore
  allForecasts: any[] = [];

  constructor(
    private searchService: SearchService,
    private weatherService: WhetherService,
    private generalservice: GeneralserviceService,
    private route: ActivatedRoute,
    private forecastService: ForecastService,
  ) {

  }

  ngOnInit(): void {

    // this.updateSubscription = timer(0, 5000).pipe(
    //   switchMap(() =>  this.weatherService.getWeatherWithCity(this.cityResult))
    // ).subscribe(result =>
    //   console.log(result)
    // );


    this.citySubscription = this.searchService.searchResult.subscribe(
      res => {
        this.cityResult = res;
        if (this.cityResult !== null && this.cityResult !== undefined) {
          this.findWeather();
          this.findEstimations();
        }
      }
    )
    this.finCity();
  }


  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this._weatherSubscription.unsubscribe();
    this.citySubscription.unsubscribe();
  }

  finCity() {
    this.route.params.subscribe(params => {
      this.city = this.route.snapshot.params['city'];
    })

  }

  findWeather() {
    timer(0, whetherApiConfig.updateInterval.weather).pipe(
      switchMap(() => this.weatherService.getWeatherWithCity(this.cityResult))
    ).subscribe(weather => {
        this.weather = weather;
        this.weatherService.adjustResponseData(this.weatherModelObject, this.weather);

      }
    );
  }

  findEstimations() {
    timer(0, whetherApiConfig.updateInterval.weather).pipe(
      switchMap(() => this.weatherService.getForecastWithCity(this.cityResult, 7))
    ).subscribe(forecast => {
        this.forecastList = forecast;
        this.allForecasts = [];
        for (let i = 0; i < 7; i++) {
          let obj = {} as Forecast;
          obj.description = forecast.list[i].weather[0].description;
          obj.currentDay = false
          obj.date = forecast.list[i].dt;
          obj.temperatureNight = forecast.list[i].temp.eve;
          obj.temperatureDay = forecast.list[i].temp.day;
          this.allForecasts.push(obj);
        }
        this.forecastService.forecast.next(this.allForecasts);

      }
    );
  }

}
