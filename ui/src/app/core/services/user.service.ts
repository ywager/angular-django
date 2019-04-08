import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  isAuth(): boolean {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return true;
    } else {
      return false;
    }
  }

  login(formData: any): Observable<any> {
    return this.http.post('/auth/login/', formData);
  }

  setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }
}
