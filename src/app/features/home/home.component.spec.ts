import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ItemService } from 'src/app/core/services/item.service';
import { IData } from 'src/app/models/item';
import { HomeComponent } from './home.component';
import { Subscription, of } from 'rxjs';
import { ItemServiceMock } from 'src/app/core/services/item.service.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let itemService: ItemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatTableModule, MatPaginatorModule],
      declarations: [HomeComponent],
      providers: [{
        provide: ItemService, useClass: ItemServiceMock
      },],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to itemService.getItems()', () => {
      const mockItems: IData[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          phone: '555-1234',
          salary: 50000,
          email: 'john.doe@example.com',
          birth: new Date(),
          gender: 'male',
        },
      ];
      const getItemsSpy = spyOn(itemService, 'getItems').and.returnValue(
        of(mockItems)
      );

      component.ngOnInit();

      expect(getItemsSpy).toHaveBeenCalled();
      expect(component.itemsSub).toBeDefined();
    });
  });

});
