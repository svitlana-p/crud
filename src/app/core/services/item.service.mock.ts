import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from 'src/app/models/item';

@Injectable()
export class ItemServiceMock {
    mockItems: IData[] = [{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '555-1234',
        salary: 50000,
        email: 'john.doe@example.com',
        birth: new Date(),
        gender: 'male',
    }];


    getItems(): Observable<IData[]> {
        return of(this.mockItems);
    }
    addEditItem(data: IData): Observable<void> {
        return of();
    }

    deleteItem(item:IData): Observable<void> {
        return of();
    }
}