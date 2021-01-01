import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CardSchema } from "../cardschema";
import Swal from 'sweetalert2'

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card: CardSchema;

  @Output()
  deleteCardItem = new EventEmitter();
  
  constructor() {}
  ngOnInit() {}
  dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  deleteItem(id){
    this.deleteCardItem.emit(id);

  }
} 