import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should set token and auth$ to true when credentials are correct', () => {
      const username = 'admin';
      const password = 'password0';
      authService.login(username, password).subscribe((result) => {
        expect(result).toBe(true);
        expect(authService.isAuthenticated()).toBe(true);
        expect(authService.auth$.value).toBe(true);
      });
    });

    it('should clear token and set auth$ to false when credentials are incorrect', () => {
      const username = 'admin';
      const password = 'wrongpassword';
      authService.login(username, password).subscribe((result) => {
        expect(result).toBe(false);
        expect(authService.isAuthenticated()).toBe(false);
        expect(authService.auth$.value).toBe(false);
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token is set', () => {
      authService['token'] = 'faketokeninfo';
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false if token is not set', () => {
      authService['token'] = '';
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});
