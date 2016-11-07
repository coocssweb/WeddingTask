import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core'
import {Photo} from './photo'
import {Mold} from '../mold/mold'
import {PhotoService} from '../../services/photos.service'
import {MoldFormComponent} from '../mold/mold-form.component'
import StringUtils from '../../utils/stringUtils'

@Component({
    selector: 'photos',
    templateUrl: 'photos.component.html',
    styleUrls: ['./photos.component.css'],
    providers: [PhotoService]
})
export class PhotosComponent implements OnInit, AfterViewInit {

    @ViewChild(MoldFormComponent)
    moldFormComponent: MoldFormComponent

    //排序项
    sort = {
        item: '',
        order: 'asc',
        key: ''
    }

    fileList: any [] = []

    //是否正在加载数据
    isLoadingData = false

    //是否显示删除确认框
    isShowConfirm = false

    //图片列表
    photoList: any [] = []

    //当前要删除的图片信息
    removePhoto: Photo

    //当前场景
    currentMold: Mold

    //是否查看大图
    isPreview: boolean = false

    //当前大图Index
    previewIndex: number

    private photoInfoId: string
    /**
     * 构造函数
     * @param photoService
     */
    constructor(private photoService: PhotoService) {
    }

    /**
     * 初始化事件
     */
    ngOnInit(): void {
        this.photoInfoId = StringUtils.getUrlQuery("photoinfoid")
        this.getPhotos(null)

    }

    ngAfterViewInit(){

    }

    /**
     * 获取图片列表
     */
    getPhotos(sceneId): void {
        //设置正在加载数据状态
        this.isLoadingData = true

        //请求加载图片列表
        this.photoService.getPhotos(this.photoInfoId, sceneId, this.sort.key, this.sort.order).then((photos: any) => {
            this.isLoadingData = false

            //设置返回数据
            this.photoList = photos.results?photos.results:[]
        })
    }

    /**
     * 设置排序
     * @param key
     * @param sortItem
     */
    onSort(key, sortItem) {
        if (sortItem === this.sort.item) {
            this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
        } else {
            this.sort.order = 'asc'
        }
        this.sort.item = sortItem
        this.sort.key = key
        this.getPhotos(this.currentMold ? this.currentMold.id : null)
    }

    /**
     * 删除图片信息
     * @param photo
     */
    onDelete(photo) {

        //显示删除确认框
        this.isShowConfirm = true

        //设置当前要删除的图片信息
        this.removePhoto = photo
    }


    /**
     * 确认事件
     */
    onConfirm() {

        //从列表中移除要删除的图片
        this.photoService.remove(this.photoInfoId, this.removePhoto.id.toString()).then((response)=> {
            for (let i = 0; i < this.photoList.length; i++) {
                if (this.photoList[i].id === this.removePhoto.id) {
                    this.photoList.splice(i, 1)
                    break
                }
            }

            this.moldFormComponent.getMolds()

            //关闭删除确认框
            this.isShowConfirm = false
        })
    }

    /**
     * 关闭确认框
     */
    onCancel() {
        this.isShowConfirm = false
    }

    /**
     * 切换原片场景
     * @param mold
     */
    onTabMoldCb(mold) {
        //选择当前场景
        if (this.currentMold && mold.id === this.currentMold.id) {
            return
        }

        //设置当前原片场景
        this.currentMold = mold
        //置空原片列表
        this.photoList = []
        //获取当前场景原片列表
        this.getPhotos(mold.id)
    }

    /**
     * 删除场景回调
     */
    onDeleteMoldCb() {
        this.photoList = []

        let currentMoldId = null

        if (this.currentMold && this.currentMold.id != 0) {
            currentMoldId = this.currentMold.id
        }

        this.getPhotos(currentMoldId)
    }

    /**
     * 查看当前大图
     * @param index
     */
    onPreview(index) {
        this.isPreview = true
        this.previewIndex = index
    }

    /**
     * 关闭当前大图
     */

    onClosePreview() {
        this.isPreview = false
    }

    /**
     * 选择图片回调
     * @param fileList
     */
    setFileListCb(fileList){
        this.fileList = fileList
    }

    /**
     * 上传图片回调
     * @param index
     */
    uploadFileCb(response){
        //移除上传成功图片
        this.fileList.pop()
        //原片列表插入刚上传的图片信息
        this.photoList.unshift(
            new Photo(response.id, response.imgIndex, response.imgName, response.imgKey,
                response.imgSize, response.imgShootTime,
                response.remark, true)
        )

        //从新获取统计信息
        if(!this.fileList.length){
            this.moldFormComponent.getMolds()
        }
    }

    /**
     * 保持图片信息
     * @param params
     */
    savePhoto(params){
        let requestParams = {
          imgKey: params.imgKey,
          imgName: params.imageName,
          imgShootTime: params.imgShootTime,
          imgSize: params.imgSize,
          photoSceneId: params.photoSceneId
        }
        this.photoService.save(this.photoInfoId, requestParams).then((response)=>{
          params.done(response)
        })
      }

}
