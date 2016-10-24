import { Component, OnInit } from '@angular/core'
import { Photo } from './photo'
import { Mold } from '../mold/mold'
import { Customer } from '../customer/customer'
import { PhotoService } from '../../services/photos.service'
import { CustomerService } from '../../services/customer.service'
import StringUtils from '../../utils/stringUtils'
import { AfterViewInit, ViewChild } from '@angular/core'
import { MoldFormComponent } from '../mold/mold-form.component'

@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService, CustomerService]
})
export class PhotosComponent implements [OnInit, AfterViewInit] {

  @ViewChild(MoldFormComponent)
  private moldFormComponent: MoldFormComponent

  confirmTitle:string = '确认删除?';

  confirmContent:string = '确认删除这条数据吗？'

  //排序项
  sortByItem = ''

  sort = ''

  sortByKey = ''

  //是否正在加载数据
  isLoadingData = false

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
    //设置正在加载数据状态
    this.isLoadingData = true

    //请求加载图片列表
    this.photoService.getPhotos(sceneId, this.sortByKey, this.sort).then((photos:any) => {
      this.isLoadingData = false

      //设置返回数据
      this.photoList = photos.results
    })
  }

  /**
   * 获取七牛Token
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
    this.photoService.delete(this.removePhoto.id.toString()).then((response)=> {
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
   * 上传图片
   * @param i
   */
  onUpload(i) {

    //设置等待状态
    this.fileList[i].isWaiting = false
    //设置当前图片为正在上传状态
    this.fileList[i].isUploading = true

    //请求七牛上传接口
    let xhr = new XMLHttpRequest()
    xhr.open('post', 'http://upload.qiniu.com', true)

    //临时存储this
    let _this:any = this

    //当前正在上传的图片
    let file = this.fileList[i]

    //生成图片上传的key
    let key = this.customer.groupId+'/'+ this.customer.id +'/raw/'+Date.now().toString()

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        //上传成功
        var result = xhr.responseText
        //
        _this.fileList[i].isUploading = false
        _this.fileList[i].isSuccess = true

        //请求保存原片信息
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
            //原片列表插入刚上传的图片信息

            setTimeout(function(){
              _this.photoList.unshift(
                new Photo(response.id,response.imgIndex, response.imgName, response.imgKey, response.imgSize, response.imgShootTime, response.remark, true )
              )
            }, 100)

            if (_this.fileList.length) {
              _this.onUpload(_this.fileList.length - 1)
            }
          })

      }
    }


    //构造Formdata上传信息
    var formData = new FormData()
    formData.append('name', file.imgName)
    formData.append('key', key)
    formData.append('token', this.token)
    formData.append('file', file.file)
    //执行发送
    xhr.send(formData)
  }

  /**
   * 切换原片场景
   * @param mold
     */
  onTabMoldCb(mold){

    //选择当前场景
    if(this.currentMold &&  mold.id === this.currentMold.id){
      return
    }

    //设置当前原片场景
    this.currentMold = mold
    //置空原片列表
    this.photoList = []
    //获取当前场景原片列表
    this.getPhotos(mold.id)
  }

  onDeleteMoldCb(){

    this.photoList = []

    let currentMoldId  = null

    if(this.currentMold && this.currentMold.id != 0){
      currentMoldId = this.currentMold.id
    }

    this.getPhotos(currentMoldId)
  }

  /**
   * 图片预览
   * @param fileList
   */
  uploadPhotoCb(fileList) {
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i]

      //倒叙插入等待上传的原片
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

  sortBy(key, sortItem){
    if(sortItem === this.sortByItem){
      this.sort = this.sort === 'asc'?'desc':'asc'
    }else{
      this.sort = 'asc'
    }
    this.sortByItem = sortItem
    this.sortByKey = key
    this.getPhotos(this.currentMold ? this.currentMold.id : null)

  }
}
