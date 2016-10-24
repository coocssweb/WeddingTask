import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class BaseService {
  constructor(private http:Http) {
  }

  get({url}) {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    return this.http.get(url, {headers: headers})
      .toPromise()
      .then((res:Response)=> {
        let body = res.json()
        return body || {}
      })
      .catch((error:any)=> {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
      })
  }


  post(url, params) {
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    let body = JSON.stringify(params)


    return this.http.post(url, body, {headers: headers})
      .toPromise()
      .then((res:Response)=> {
        let body = res.json()
        return body || {}
      })
      .catch((error:any)=> {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error'
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
      })
  }

  delete(url) {

  }


}

