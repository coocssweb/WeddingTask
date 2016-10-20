import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Mold } from '../components/mold/mold'
import { DOMAIN } from '../constant/config'

@Injectable()
export class MoldService {

  private moldUrl = 'http://localhost:8080/data-test/list.json';

  constructor (private http: Http) {}

  getMolds(): Promise<Mold[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.moldUrl, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}
