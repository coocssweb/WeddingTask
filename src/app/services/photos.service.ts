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
    getPhotos(sceneId, sortBy, sortOrder): Promise<Photo[]> {
        let url = '/photoInfos/3/photoRaws?pageNo=1&pageSize=-1'

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
    save(params): Promise<Photo> {

        let body = JSON.stringify(params)
        return this.post('/photoInfos/3/photoRaws', body)
    }

    /**
     * 删除信息
     * @param ids
     * @returns
     */
    remove(ids) {
        return this.delete('/photoInfos/3/photoRaws/', ids)
    }

    /**
     * 完成选片，提交
     * @param photoInfoId
     * @returns {Promise<any>}
     */
    finish(photoInfoId): Promise<any> {
        return this.put('/photoInfos/3/actions/finishUploadRaw')
    }
}
