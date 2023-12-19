import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private BASEURL = environment.api

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.BASEURL + endpoint, { headers: this.headers() });
  }

  post(endpoint: string, data: any) {
    return this.http.post(this.BASEURL + endpoint, data);
  }

  delete(endpoint: string,) {
    return this.http.delete(this.BASEURL + endpoint, { headers: this.headers() });
  }

  private headers(): HttpHeaders {
    // Define custom headers if needed
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
}
