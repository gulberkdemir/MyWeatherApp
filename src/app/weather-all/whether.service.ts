import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Weather} from "./weather.model";
import {HttpClient} from "@angular/common/http";
import {whetherApiConfig, whetherAppConfig} from "../whether-config";
import {GeneralserviceService} from "../shared/generalservice.service";

@Injectable({
  providedIn: 'root'
})
export class WhetherService {
  private unitSystem: string;
  private weather: Subject<Weather> = new Subject<Weather>();


  // @ts-ignore
  constructor(
    private http: HttpClient,
    private generalService: GeneralserviceService,

  ) {
    this.unitSystem = 'metric';
    // this.wiDataByCode = wiDataByCode;
  }

  // @ts-ignore
  getWeatherWithCity(city: string): Observable<any>{
    return this.http.get<any>(`${whetherApiConfig.host}/weather?appid=${whetherApiConfig.appId}&q=${city}&units=${this.unitSystem}`)

  }

  getForecastWithCity(city: string, cnt: number): Observable<any>{
    return this.http.get<any>(`${whetherApiConfig.host}/forecast/daily?q=${city}&appid=${whetherApiConfig.appId}&units=${this.unitSystem}&cnt=${cnt}`)

  }

  adjustResponseData(object: Weather, response: any){
    object.updateAt = new Date();
    object.humidity = response.main.humidity;
    object.sunset = this.generalService.GetUtcDate(response.sys.sunset);
    object.sunrise =this.generalService.GetUtcDate(response.sys.sunrise);
    object.windSpeed = response.wind.speed;
    object.description = response.weather[0].description;
    object.pressure = response.main.pressure;
    object.city = response.name;
    object.temp = response.main.temp;
  }

}
