import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  addEditItem(data: IData): Observable<void> {
    return new Observable((observer) => {
      try {
        localStorage.setItem(`item_${data.id}`, JSON.stringify(data));
        observer.next();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  getItems(): Observable<IData[]> {
    const items: IData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("item_")) {
        const itemString = localStorage.getItem(key);
        const item = itemString ? JSON.parse(itemString) as IData : null;
        if(item) items.push(item);
      }
    }
    return of(items);
  }

  deleteItem(item:IData): Observable<void> {
    return new Observable((observer) => {
      try {
        localStorage.removeItem(`item_${item.id}`);
        observer.next();
      } catch (error) {
        observer.error(error);
      }
    });
  }

}
