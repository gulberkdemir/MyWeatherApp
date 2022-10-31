import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchResult = new Subject<string>();

  constructor() { }
}
