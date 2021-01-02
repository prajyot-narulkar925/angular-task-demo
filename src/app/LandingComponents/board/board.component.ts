import { Component, OnInit } from '@angular/core';
import { CardStore } from './../../cardstore';
import { ListSchema } from './../../listschema';
import Swal from 'sweetalert2'
import { MockDataService } from './../../service/mock-data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cardStore: CardStore;
  lists: ListSchema[];
  constructor(private mockDataService:MockDataService) { }
  setMockData(): void {
    this.cardStore = new CardStore();
    this.lists = this.mockDataService.getItemList();
  }

  ngOnInit() {
    this.setMockData();
  }
  
  addListItem(){
    Swal.fire({
      title: "Name of the list Item!",
      text: "Enter List item name",
      input: 'text',
      showCancelButton: true        
  }).then((result) => {
      if (result.value !="" && result.value !=null) {
        const found = this.lists.some(el => el.name === result.value);
            if(!found){
                var obj = {
                  id:this.lists.length,
                  name: result.value,
                  cards: []
                };
                this.lists.push(obj);
            }
              else{
                Swal.fire(
                  "List Name already present!"
                ).then();
              }
      } else if(result.value != undefined){
        Swal.fire(
          "List Name is required!"
        ).then();
      }
  });
  }

  deleteItem(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let index;
        for(let i=0;i<this.lists.length;i++){
          if(this.lists[i].id == id){
            index = i;
          }
        }
        this.lists.splice(index,1);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        ).then();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        ).then();
      }
    })

  }

  allowDrop($event) {
    $event.preventDefault();
  }
}