import { Component, OnInit } from '@angular/core';
import { CardStore } from '../CardStore';
import { ListSchema } from '../ListSchema';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cardStore: CardStore;
  lists: ListSchema[];
  constructor() { }
  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [
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
    this.lists = lists;
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
      if (result.value) {
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
                );
              }
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
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })

  }
}