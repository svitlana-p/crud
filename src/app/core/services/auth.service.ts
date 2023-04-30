import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  auth$ = new BehaviorSubject<boolean>(false);
  
  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'password0') {
      this.token = 'faketokeninfo';
      this.auth$.next(true)
      return of(true);
    } else {
      this.token = '';
      this.auth$.next(false)
      return of(false);
    }
  }
  isAuthenticated(): boolean {
    return !!this.token
  }
}
