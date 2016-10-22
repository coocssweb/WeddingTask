import { Injectable } from '@angular/core';
import { Photo } from '../components/photos/photo'
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http'
import { DOMAIN } from '../constant/config'

@Injectable()
export class PhotoService {

  constructor (private http: Http) {}

  private tokenUrl = DOMAIN + '/photo/uptoken';

  private photoUrl = DOMAIN + '/photoInfos/3/photoRaws?pageNo=1&pageSize=-1'

  private serverUrl = DOMAIN + '/photoInfos/3/photoRaws'

  /**
   * 获取图片列表
   * @returns {any|Promise<T|Promise<never>|Promise<T>>|Promise<Promise<never>|Promise<T>>|Function|webdriver.promise.Promise<R>|Promise<R>}
   */
  getPhotos( sceneId ): Promise<Photo[]> {
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    let url = this.photoUrl

    if(sceneId){
      url = this.photoUrl +'&_filter_eq_photoSceneId='+sceneId
    }

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

  /**
   * 保存数据
   * @param params
   * @returns {any|Promise<T|Promise<never>|Promise<T>>|Promise<Promise<never>|Promise<T>>|Function|webdriver.promise.Promise<R>|Promise<R>}
   */
  save(params): Promise<Photo>{
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    let body = JSON.stringify(params)

    return this.http.post(this.serverUrl, body, {headers: headers})
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

  /**
   * 删除信息
   * @param ids
   * @returns {any|Promise<T|Promise<never>|Promise<T>>|Promise<Promise<never>|Promise<T>>|Function|webdriver.promise.Promise<R>|Promise<R>}
   */
  delete(ids){
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')


    return this.http.delete(this.serverUrl + '/' + ids,  {headers: headers})
      .toPromise()
      .then((res:Response)=> {

        if(res.status.toString().startsWith('2')){
          return {}
        }

      })
      .catch((error:any)=> {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
      })
  }

  /**
   * 获取七牛Token
   * @returns {any|Promise<T|Promise<never>|Promise<T>>|Promise<Promise<never>|Promise<T>>|Function|webdriver.promise.Promise<R>|Promise<R>}
   */
  getToken(): Promise<String> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept','application/json')

    return this.http.get(this.tokenUrl, { headers: headers })
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
