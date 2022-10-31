import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Weather} from "../weather.model";
import {ForecastService} from "./forecast.service";
import {Forecast} from "../forecast.model";
import {GeneralserviceService} from "../../shared/generalservice.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {

  @Input() forecastList :any[];
  @Input() unitSystem: string;
  @Input() cityName: string;
  finalEstimationArray : Forecast[] = []

  constructor(private forecastService: ForecastService,
              private generalService: GeneralserviceService) { }

  ngOnInit(): void {
    this.forecastService.forecast.subscribe(res=>
    {this.finalEstimationArray = res;
    });
  }

  ngOnDestroy(): void{
    this.forecastService.forecast.unsubscribe();
  }

}
