import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { ListSchema } from "./../../listschema";
import { CardStore } from "./../../cardstore";
import Swal from 'sweetalert2'
import { MockDataService } from "./../../service/mock-data.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  listsData: ListSchema[];

  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  displayAddCard = false;
  displayCardTitle = false;

  @Output()
  deleteListItem = new EventEmitter();

  constructor(private mockDataService:MockDataService) {
    this.listsData = this.mockDataService.getItemList();

  }
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
    $event.stopPropagation();
  }

  onEnter(value: string) {
    var flag = false;
    var cardList=[];
    if(value !='' || value == null){
      for(let i=0;i<this.listsData.length;i++){
        for(let j=0;j<this.listsData[i].cards.length;j++)
        {cardList.push(this.listsData[i].cards[j]);}
      }
      for(let i=0;i<cardList.length;i++){
        var cardData = this.cardStore.getCard(cardList[i]);
        if(cardData?.description == value){
          flag =true;
        }
      }
      if(!flag){
        const cardId = this.cardStore.newCard(value);
        this.list.cards.push(cardId);
      }
      else{
        Swal.fire('Name is already present!').then();
      }
    }
    else{
      Swal.fire('Name is mandatory for adding a task').then();
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
      ).then();
    }
  })
    
  }

  deleteList(id:number){
    this.deleteListItem.emit(id);
  }

  onUpdateTitle(value:string){
    var flag = false;
    if(value !="" && value != null){
      for(let i=0;i<this.listsData.length;i++){
        if(this.listsData[i].name == value){
          flag = true;
        }
      }
      if(!flag){
        this.list.name = value;
      }
      else{
        Swal.fire(
          "List Name already present!"
        ).then();
      }
    }
    else{
      Swal.fire(
        "List Name is required!"
      ).then();
    }

  }

  listdragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
