import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  public baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.urlAPI}User`;
  }
   /**
   * findById
   */
  public findAll(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/findAll`);
  }

  public findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/findById/${id}`);
  }

  public findByUser(username: string, password: string): Observable<boolean> {
    const user = {name: username, password: password} as User; // Criando objeto do tipo usuario

    return this.http.post<any>(`${this.baseUrl}/findByUser/`, JSON.stringify(user), { headers: this.headers });
  }

  public create(user: User): Observable<boolean> {
      return this.http.post<any>(this.baseUrl + '/create', JSON.stringify(user), { headers: this.headers });
  }

  public update(user: User): Observable<boolean> {
    return this.http.put<any>(this.baseUrl + '/update', JSON.stringify(user), { headers: this.headers });
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
 
}
