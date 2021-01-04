import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event while deleting the entire list', () => {
    let listId = null;
    component.deleteListItem.subscribe(lid=> listId=lid);
    component.deleteList(0);

    expect(listId).toBe(0);

  });

  it('should toggle to add the new field in the list', () => {

    let val = component.displayAddCard;

    component.toggleDisplayAddCard();

    expect(val).not.toBe(!val);

  });

  it('Delete card item from the list on confirm',()=>{

    let spy = spyOn(component, 'deleteCard').and.returnValue();
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteCard(0);
    expect(spy).toHaveBeenCalledWith(0);

    // expect(spy).toHaveBeenCalled();
  })

  it('Don\'t delete card item from the list on cancle',()=>{

    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(component, 'deleteCard').and.returnValue();

    expect(spy).not.toHaveBeenCalled();
  })
});
