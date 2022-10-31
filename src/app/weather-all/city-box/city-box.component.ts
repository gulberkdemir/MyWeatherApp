import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {Weather} from "../weather.model";
import {whetherApiConfig} from "../../whether-config";
import {GeneralserviceService} from "../../shared/generalservice.service";

@Component({
  selector: 'app-city-box',
  templateUrl: './city-box.component.html',
  styleUrls: ['./city-box.component.scss']
})
export class CityBoxComponent implements OnInit, OnDestroy {
  @Input() weather: Weather;
  @Input() unitSystem: string;
  @Input() city: string;
  measurementUnits: string;
  private clocktimeSubscripction: Subscription;
  date: Date;

  constructor(private generalService: GeneralserviceService) { }

  ngOnInit(): void {
    const source = interval(1000);
    // @ts-ignore
    this.clocktimeSubscripction = source.subscribe(val => this.date = this.generalService.GetCurrent());
    this.measurementUnits = whetherApiConfig.measurementUnits['metric'].temperature;
  }

  ngOnDestroy(): void{
    this.clocktimeSubscripction.unsubscribe();

  }

}
