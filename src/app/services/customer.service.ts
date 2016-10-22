/**
 * Created by wangjiaxin on 16/10/22.
 * @description 客户信息service
 */

import { Injectable } from '@angular/core';
import { Customer } from '../components/customer/customer'
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http'
import { DOMAIN } from '../constant/config'

@Injectable()
export class CustomerService {

  constructor (private http: Http) {}


  getCustomerByPhotoInfo(photoInfoId){
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept','application/json')

    return this.http.get(DOMAIN + '/photoInfos/'+photoInfoId+'/customer', { headers: headers })
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
