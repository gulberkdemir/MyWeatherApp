import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralserviceService {

  constructor() { }

  GetDate(num: number) {
    return new Date(num).toLocaleDateString();
  }

  GetTime(num: number) {
    return new Date(num).toLocaleTimeString();
  }

  GetUtcDate(num: number){
    var date = new Date(num * 1000);
    return date.toUTCString();
  }

  GetCurrent(){
    return new Date();
  }

}
