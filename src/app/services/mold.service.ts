import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Mold } from '../components/mold/mold'
import { DOMAIN } from '../constant/config'

@Injectable()
export class MoldService {

  private moldUrl = 'http://b-test.idaoying.com/photoInfos/3/photoScenes';

  constructor (private http: Http) {}

  getMolds(): Promise<Mold[]> {
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept','application/json')

    return this.http.get(this.moldUrl, { headers: headers })
      .toPromise()
      .then((res: Response)=>{
        let body = res.json()
        return body || { }
      })
      .catch((error: any)=>{
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
      })
  }

  addMold(sceneName: string): Promise<Mold[]>{
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept','application/json')

    let body = JSON.stringify({sceneName})



    return this.http.post(this.moldUrl, body, { headers: headers })
      .toPromise()
      .then((res: Response)=>{
        let body = res.json()
        return body || { }
      })
      .catch((error: any)=>{
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
      })

  }

}

