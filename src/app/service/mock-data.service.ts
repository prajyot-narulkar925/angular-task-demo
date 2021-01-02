import { Injectable } from '@angular/core';
import { ListSchema } from '../ListSchema';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  lists: ListSchema[]
  constructor() { 
    this.lists = [
      {
        id:0,
        name: 'To Do',
        cards: []
      },
      {
        id:1,
        name: 'In Progress',
        cards: []
      },
      {
        id:2,
        name: 'Done',
        cards: []
      }
    ]
  }
  getItemList(){
    return this.lists;
  }

}
