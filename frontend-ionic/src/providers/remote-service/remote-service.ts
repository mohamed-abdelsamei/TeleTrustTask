import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  apiUrl: string = "http://localhost:3000/";
  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getAllAccounts(q: any, p: any) {
    return this.http.get(this.apiUrl + 'account/getAll?search=' + q + '&page=' + p).map(res => res.json());
  }

  getAccount(oID: any) {
    return this.http.get(this.apiUrl + 'account/getAccount/' + oID).map(res => res.json());

  }


}
