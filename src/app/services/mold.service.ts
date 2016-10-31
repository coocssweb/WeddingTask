import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'
import {Mold} from '../components/mold/mold'

@Injectable()
export class MoldService extends BaseService {

    constructor(http: Http) {
        super(http)
    }
    getOptions(): Promise<Mold[]> {
        return this.get('/scenes')
    }

    /**
     * 获取原片场景列表
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    getMolds(): Promise<Mold[]> {
        return this.get('/photoInfos/3/photoScenes/actions/statistics')
    }

    /**
     * 添加原片场景
     * @param sceneName
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    addMold(sceneName: string): Promise<Mold[]> {
        let body = JSON.stringify({sceneName})
        return this.post('/photoInfos/3/photoScenes', body)
    }

    /**
     * 删除原品场景
     * @param ids
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    deleteMold(ids: string) : Promise<any>{
        return this.delete('/photoInfos/3/photoScenes/', ids)
    }

}

