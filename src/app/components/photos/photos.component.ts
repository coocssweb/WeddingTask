import { Component, OnInit } from '@angular/core'
import { Photo } from './photo'
import { Mold } from '../mold/mold'
import { Customer } from '../customer/customer'
import { PhotoService } from '../../services/photos.service'
import { CustomerService } from '../../services/customer.service'
import StringUtils from '../../utils/stringUtils'

@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService, CustomerService]
})
export class PhotosComponent implements OnInit {


  confirmTitle:string = '确认删除?';

  confirmContent:string = '确认删除这条数据吗？'


  //是否显示删除确认框
  isShowConfirm = false

  //图片列表
  photoList:any [] = []

  //上传列表
  fileList:any [] = []

  //token
  token:string

  //当前要删除的图片信息
  removePhoto:Photo

  //是否正在上传
  isUploading = false

  //当前客户信息
  customer: Customer

  //当前场景
  currentMold: Mold


  /**
   * 构造函数
   * @param photoService
   */
  constructor(private photoService:PhotoService, private customerService:CustomerService) {
  }

  /**
   * 初始化事件
   */
  ngOnInit():void {
    this.getPhotos(null)
    this.getToken()
    this.getCustomer()
  }

  /**
   * 获取图片列表
   */
  getPhotos(sceneId):void {
    this.photoService.getPhotos(sceneId).then((photos:any) => {
      this.photoList = photos.results
    })
  }

  /**
   * 获取Token
   */
  getToken():void {
    this.photoService.getToken()
      .then((token:any) => {
        this.token = token
      })
  }

  /**
   * 获取用户信息
   */
  getCustomer():void{
    this.customerService.getCustomerByPhotoInfo(3).then((response: any)=>{
      this.customer = new Customer(response.id, response.name, response.groupId, response.headImage)
    })
  }

  /**
   * 删除图片信息
   * @param photo
   */
  onDelete(photo) {
    this.isShowConfirm = true
    this.removePhoto = photo
  }


  /**
   * 确认事件
   */
  onConfirm() {

    this.photoService.delete(this.removePhoto.id.toString()).then((response)=> {
      for (let i = 0; i < this.photoList.length; i++) {
        if (this.photoList[i].id === this.removePhoto.id) {
          this.photoList.splice(i, 1)
          break
        }
      }
    })

    this.isShowConfirm = false
  }

  /**
   * 关闭确认框
   */
  onCancel() {
    this.isShowConfirm = false
  }


  /**
   * 上传图片
   * @param i
   */
  onUpload(i) {

    //设置等待状态
    this.fileList[i].isWaiting = false
    this.fileList[i].isUploading = true

    let xhr = new XMLHttpRequest()
    xhr.open('post', 'http://upload.qiniu.com', true)

    let _this:any = this

    let file = this.fileList[i]

    let key = this.customer.groupId+'/'+ this.customer.id +'/raw/'+Date.now().toString()

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        //上传成功
        var result = xhr.responseText
        //
        _this.fileList[i].isUploading = false
        _this.fileList[i].isSuccess = true

        //请求保存数据

        _this.photoService.save(
          {
            imgKey: key,
            imgName: file.imgName,
            imgShootTime: file.imgShootTime,
            imgSize: file.imgSize,
            photoSceneId: _this.currentMold.id
          }
        ).then((response: any)=> {
            //移除当前项目
            _this.fileList.pop()

            _this.photoList.unshift(
              new Photo(response.id,response.imgIndex, response.imgName, response.imgKey, response.imgSize, response.imgShootTime, response.remark, true )
            )

            if (_this.fileList.length) {
              _this.onUpload(_this.fileList.length - 1)
            }
          })

      }
    }


    var formData = new FormData()
    formData.append('name', file.imgName)
    formData.append('key', key)
    formData.append('token', this.token)
    formData.append('file', file.file)
    //执行发送
    xhr.send(formData)
  }

  onTabMoldCb(mold){
    this.currentMold = mold
    this.getPhotos(mold.id)

  }


  /**
   * 图片预览
   * @param fileList
   */
  uploadPhotoCb(fileList) {
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i]
      this.fileList.unshift({
        id: 0,
        imgKey: '',
        imgName: file.name,
        imgSize: (file.size / (1024 * 1024)).toFixed(2),
        imgShootTime: StringUtils.stampToString(file.lastModified),
        file: file,
        remark: '',
        isUploading: false,
        isSuccess: false,
        isWaiting: true
      })
    }

    if (!this.isUploading) {
      this.onUpload(this.fileList.length - 1)
    }

  }
}
