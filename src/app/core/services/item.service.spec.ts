import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { IData } from 'src/app/models/item';


describe('ItemService', () => {
  let itemService: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemService]
    });

    itemService = TestBed.inject(ItemService);
    
  });
  const data: IData = { 
    id: 1, 
    firstName: 'Test', 
    lastName: 'Item', 
    salary: 22, 
    email: 'c@mail.com', 
    phone: '0687485963', 
    birth: new Date(2023,4,30), 
    gender: 'male' 
  };
    
  it('should be created', () => {
    expect(itemService).toBeTruthy();
  });

  it('should add an item to local storage', (done: DoneFn) => {
    itemService.addEditItem(data).subscribe(() => {
      const itemString = localStorage.getItem(`item_${data.id}`);
      const item = itemString ? JSON.parse(itemString) : null;

      expect(item.id).toEqual(data.id);
      done();
    });
  });

  it('should retrieve items from local storage', (done: DoneFn) => {
    const data1: IData = { id: 1, firstName: 'Test Item', lastName: 'A test item1', salary: 22, email: 'c@mail.com', phone: '0687485963', birth: new Date(2023,4,30), gender: 'male' };
    const data2: IData = { id: 1, firstName: 'Test Item', lastName: 'A test item2', salary: 22, email: 'c@mail.com', phone: '0687485963', birth: new Date(2023,4,30), gender: 'male' };
    localStorage.setItem(`item_${data1.id}`, JSON.stringify(data1));
    localStorage.setItem(`item_${data2.id}`, JSON.stringify(data2));

    itemService.getItems().subscribe((item: IData[]) => {
      expect(item.length).toEqual(1);
      done();
    });
  });

  it('should delete an item from local storage', (done: DoneFn) => {
    localStorage.setItem(`item_${data.id}`, JSON.stringify(data));

    itemService.deleteItem(data).subscribe(() => {
      const itemString = localStorage.getItem(`item_${data.id}`);
      const item = itemString ? JSON.parse(itemString) : null;

      expect(item).toBeNull();
      done();
    });
  });
});
