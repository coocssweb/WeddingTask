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
     * 获取照片信息状态
     * @param photoInfoId
     * @returns {Promise<any>}
     */
    getRawInfo(photoInfoId){
      return this.get('/photoInfos/'+photoInfoId+'/actions/rawInfo')
    }

    /**
     * 获取原片场景列表
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    getMolds(photoInfoId): Promise<Mold[]> {
        return this.get('/photoInfos/'+photoInfoId+'/photoScenes/actions/statistics')
    }

    /**
     * 添加原片场景
     * @param sceneName
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    addMold(photoInfoId, sceneName): Promise<Mold[]> {
        let body = JSON.stringify({sceneName})
        return this.post('/photoInfos/'+photoInfoId+'/photoScenes', body)
    }

    /**
     * 删除原品场景
     * @param ids
     * @returns {Promise<never|T>|Promise<never>|Observable<R>|Promise<R>|any}
     */
    deleteMold(photoInfoId, ids) : Promise<any>{
        return this.delete('/photoInfos/'+photoInfoId+'/photoScenes/', ids)
    }

}

