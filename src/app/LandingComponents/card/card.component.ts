import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ListSchema } from "src/app/listschema";
import { MockDataService } from "src/app/service/mock-data.service";
import { CardSchema } from "./../../cardschema";
import Swal from 'sweetalert2'

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  listsData: ListSchema[];
  displayCardTitle = false;
  @Input() card: CardSchema;

  @Output()
  deleteCardItem = new EventEmitter();
  
  constructor(private mockDataService:MockDataService) {
    this.listsData = this.mockDataService.getItemList();

  }
  ngOnInit() {
  }
  dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  deleteItem(id){
    this.deleteCardItem.emit(id);

  }
  onUpdateTitle(value,id){
     if(value !='' || value == null){
       this.card.description = value;
    }
    else{
      Swal.fire('Name is mandatory for adding a task').then();
    }
  }
} 