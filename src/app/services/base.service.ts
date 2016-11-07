import {Headers, RequestOptions} from '@angular/http'
import {Response, Http} from '@angular/http'
import { DOMAIN } from '../constant/config'

export class BaseService{
    private http: Http
    constructor(http: Http) {
        this.http = http
    }

    get(url): Promise<any> {
        let headers = new Headers()

        headers.append('X-Requested-With', 'XMLHttpRequest')
        headers.append('Content-Type', 'application/json; charset=UTF-8')
        headers.append('Accept', 'application/json')

        return this.http.get(DOMAIN + url, {headers: headers})
            .toPromise()
            .then((res: any)=> {

                if(!res._body){
                  return {}
                }

                let body = res.json()
                return body || {}
            })
            .catch((error: any)=> {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error'
                console.error(errMsg)
                return Promise.reject(errMsg);
            })
    }


    post(url, body): Promise<any>{
        let headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest')
        headers.append('Content-Type', 'application/json; charset=UTF-8')
        headers.append('Accept', 'application/json')

        return this.http.post( DOMAIN + url , body, {headers: headers})
            .toPromise()
            .then((res:Response)=> {
                let body = res.json()
                return body || {}
            })
            .catch((error:any)=> {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error'
                console.error(errMsg)
                return Promise.reject(errMsg)
            })
    }


    delete(url, ids): Promise<any>{
        let headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest')
        headers.append('Content-Type', 'application/json; charset=UTF-8')
        headers.append('Accept', 'application/json')

        let deleteUrl = DOMAIN + url
        if(ids){
            deleteUrl += ids
        }

        return this.http.delete(deleteUrl,  {headers: headers})
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

    put(url): Promise<any>{
        let headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest')
        headers.append('Content-Type', 'application/json; charset=UTF-8')
        headers.append('Accept', 'application/json')

        return this.http.put( DOMAIN + url, {headers: headers})
            .toPromise()
            .then((res: Response)=> {
                let body = res.json()
                return body || {}
            })
            .catch((error: any)=> {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error'
                console.error(errMsg)
                return Promise.reject(errMsg);
            })
    }
}

