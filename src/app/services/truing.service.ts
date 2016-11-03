import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {BaseService} from './base.service'
import {Truing} from '../components/truings/truing'

@Injectable()
export class TruingService extends BaseService {
  constructor(http: Http) {
    super(http)
  }

  /**
   * 获取图片列表
   * @returns
   */
  getTruings(photoInfoId, sortBy, sortOrder): Promise<Truing[]> {
    let url ='/photoInfos/'+photoInfoId+'/photoTruings?pageNo=1&pageSize=-1'

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
  save(photoInfoId, params): Promise<Truing> {

    let body = JSON.stringify(params)
    return this.post('/photoInfos/'+photoInfoId+'/photoTruings', body)
  }

  /**
   * 删除信息
   * @param ids
   * @returns
   */
  remove(photoInfoId, imgName) {
    return this.delete('/photoInfos/'+photoInfoId+'/photoTruings?imgName='+encodeURI(imgName)+'&type=all', null)
  }
}
