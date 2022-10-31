import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Weather} from "../weather.model";
import {Forecast} from "../forecast.model";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
   forecast  = new Subject<any[]>();

  constructor() { }
}
