import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http'
import { Mold } from '../components/mold/mold'
import { DOMAIN } from '../constant/config'

@Injectable()
export class MoldService {

  private moldUrl = DOMAIN + '/photoInfos/3/photoScenes/actions/statistics';


  constructor(private http:Http) {
  }

  /**
   * 获取原片场景列表
   * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
  getMolds():Promise<Mold[]> {
    let headers = new Headers()

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    return this.http.get(this.moldUrl, {headers: headers})
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

  /**
   * 添加原片场景
   * @param sceneName
   * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
  addMold(sceneName:string):Promise<Mold[]> {
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')

    let body = JSON.stringify({sceneName})


    return this.http.post( DOMAIN + '/photoInfos/3/photoScenes' , body, {headers: headers})
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

  /**
   * 删除原品场景
   * @param ids
   * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
  delete(ids: string){
    let headers = new Headers();

    headers.append('X-Requested-With', 'XMLHttpRequest')
    headers.append('Content-Type', 'application/json; charset=UTF-8')
    headers.append('Accept', 'application/json')


    return this.http.delete(DOMAIN + '/photoInfos/3/photoScenes/' + ids,  {headers: headers})
      .toPromise()
      .then((res:Response)=> {

        if(res.status.toString().startsWith('2')){
          return {}
        }

      })
      .catch((error:any)=> {
        let body = error.json()

        return body || {}
      })

  }

}

