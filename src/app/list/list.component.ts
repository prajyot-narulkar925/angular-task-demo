import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { ListSchema } from "../ListSchema";
import { CardStore } from "../CardStore";
import Swal from 'sweetalert2'

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  displayAddCard = false;

  @Output()
  deleteListItem = new EventEmitter();

  constructor() {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {}
  allowDrop($event) {
    $event.preventDefault();
  }
  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    let target = $event.target;
    const targetClassName = target.className;
    while (target.className !== "list") {
      target = target.parentNode;
    }
    target = target.querySelector(".cards");
    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === "list__title") {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }
  onEnter(value: string) {
    if(value !='' || value == null){
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
    }
    else{
      Swal.fire('Name is mandatory for adding a task')
    }
  }
  deleteCard(e){

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
      for(let i=0;i<this.list.cards.length;i++){
        if(this.list.cards[i] == e){
          index = i;
        }
      }
      this.list.cards.splice(index,1);

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your data is safe :)',
        'error'
      )
    }
  })
    
  }

  deleteList(id){
    this.deleteListItem.emit(id);
  }
}
