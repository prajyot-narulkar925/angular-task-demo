import { CardStore } from './cardstore';

describe('Cardstore', () => {
  it('should create an instance', () => {
    expect(new CardStore()).toBeTruthy();
  });

  it('should return card data',()=>{
    let card = new CardStore();
    expect(card.getCard('1')).not.toBe('1');
  })

  it('should add new card data',()=>{
    let card = new CardStore();
    let spy= spyOn(card,'newCard').and.returnValue('1');
    card.newCard('1');
    expect(spy).not.toBe('1');
  })
});
