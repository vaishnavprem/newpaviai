import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private results = new BehaviorSubject([]);
  constructor() { }

  public getResults$(){
    return this.results.asObservable();
  }

  public getSuggestion(name) {
    this.results.next(name)
}
}
