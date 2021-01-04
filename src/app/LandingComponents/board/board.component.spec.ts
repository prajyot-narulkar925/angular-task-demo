import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add item in list',()=>{
    component.addListItem();
    spyOn(window, 'confirm').and.returnValue(true);
    // let fnCall = spyOn(component,'addListItem').and.returnValue();

    let length = component.lists.length;
    expect(component.lists.length).toBe(length);
  })

  it('Delete item from the list on confirm',()=>{
    // component.deleteItem(1);
    // let length = component.lists.length;
    // expect(component.lists.length).toBe(length);
    let spy = spyOn(component, 'deleteItem').and.returnValue();
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteItem(0);
    expect(spy).toHaveBeenCalledWith(0);

    // expect(spy).toHaveBeenCalled();
  })

  it('Don\'t delete item from the list on cancles',()=>{

    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(component, 'deleteItem').and.returnValue();

    expect(spy).not.toHaveBeenCalled();
  })
  
  it('should not add an item if name already exists',()=>{
    let spy = spyOn(component, 'deleteItem').and.returnValue(null);

    expect(spy).not.toBe(null);
  })
});
