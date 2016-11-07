import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'
import {Photo} from '../components/photos/photo'

@Injectable()
export class PhotoService extends BaseService {
    constructor(http: Http) {
        super(http)
    }

    /**
     * 获取图片列表
     * @returns
     */
    getPhotos(photoInfoId, sceneId, sortBy, sortOrder): Promise<Photo[]> {
        let url = '/photoInfos/'+photoInfoId+'/photoRaws?pageNo=1&pageSize=-1'

        if (sceneId) {
            url += '&_filter_eq_photoSceneId=' + sceneId

        }

        if (sortBy) {
            url += '&' + sortBy + '=' + sortOrder
        }

        return this.get(url)

    }

    /**
     * 保存数据
     * @param params
     * @returns
     */
    save(photoInfoId, params): Promise<Photo> {

        let body = JSON.stringify(params)
        return this.post('/photoInfos/'+photoInfoId+'/photoRaws', body)
    }

    /**
     * 删除信息
     * @param ids
     * @returns
     */
    remove(photoInfoId, ids) {
        return this.delete('/photoInfos/'+photoInfoId+'/photoRaws/', ids)
    }

    /**
     * 完成选片，提交
     * @param photoInfoId
     * @returns {Promise<any>}
     */
    finish(photoInfoId): Promise<any> {
        return this.put('/photoInfos/'+photoInfoId+'/actions/finishUploadRaw')
    }
}
