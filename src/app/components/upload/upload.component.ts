import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service'
import {CustomerService} from '../../services/customer.service'
import {Customer} from '../../components/customer/customer'
import StringUtils from '../../utils/stringUtils'
import {Mold} from '../../components/mold/mold'
import EXIF from 'exif-js'

@Component({
  selector: 'upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [UploadService, CustomerService]
})

export class UploadComponent implements OnInit {

  //选择图片回调
  @Output() setFileListCb = new EventEmitter()

  //上传图片回调
  @Output() uploadFileCb = new EventEmitter()

  //保存图片信息回调
  @Output() saveCb = new EventEmitter()

  @Input() mold:Mold

  @Input() title:String

  @Input() btnText:String

  @Input() requireMold:boolean = false

  @Input() fileInputId:String

  //是否显示tip信息
  isTip:boolean = false

  //当前客户信息
  customer:Customer
  //token
  token:any = []
  //上传列表
  fileList:any [] = []
  //是否正在上传
  isFetchingToken:boolean = false

  private photoInfoId:string

  constructor(private uploadService:UploadService, private customerService:CustomerService) {

  }

  /**
   * 初始化事件
   */
  ngOnInit():void {
    this.photoInfoId = StringUtils.getUrlQuery("photoinfoid")
    this.getCustomer()
  }

  //上传按钮点击事件
  onClick() {

    if (!this.mold && this.requireMold) {
      this.isTip = true
      return
    }

    document.getElementById("" + this.fileInputId).click()
  }

  onConfirm() {
    this.isTip = false
  }

  /**
   * 获取用户信息
   */
  getCustomer():void {
    this.customerService.getCustomerByPhotoInfo(this.photoInfoId).then((response:any)=> {
      this.customer = new Customer(response.id, response.name, response.groupId, response.headImage)
    })
  }


  /**
   * 上传图片
   * @param i
   */
  uploadFile(i) {

    //设置等待状态
    this.fileList[i].isWaiting = false

    this.setFileListCb.emit(this.fileList)

    //请求七牛上传接口
    let xhr = new XMLHttpRequest()
    xhr.open('post', 'http://upload.qiniu.com', true)

    //临时存储this
    let _this = this

    //当前正在上传的图片
    let file = this.fileList[i]

    //当前token
    let token = this.token[i]

    //生成图片上传的key

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        //上传成功
        var result = xhr.responseText
        //
        _this.fileList[i].isUploading = false
        _this.fileList[i].isSuccess = true

        _this.setFileListCb.emit(_this.fileList)


        let save = _this.saveCb.emit({
          imgKey: token.key,
          imgName: file.imgName,
          imgShootTime: file.imgShootTime,
          imgSize: file.imgSize,
          photoSceneId: _this.mold ? _this.mold.id : 0,
          done: (response:any)=> {
            //回调上传成功方法
            _this.uploadFileCb.emit(response)
            if (_this.fileList.length) {
              _this.token.pop()
              _this.uploadFile(_this.fileList.length - 1)
            }
          }
        })
      }
    }


    //构造Formdata上传信息
    var formData = new FormData()
    formData.append('name', file.imgName)
    formData.append('key', token.key)
    formData.append('token', token.token)
    formData.append('file', file.file)
    //执行发送
    xhr.send(formData)
  }

  //文件输入框变化事件
  onFileChange(event:any) {
    let files = (<HTMLInputElement>document.getElementById("" + this.fileInputId)).files


    let fileList = []

    for (let i = 0; i < files.length; i++) {
      let file:any = files[i]
      //倒叙插入等待上传的原片
      let imgShootTime = StringUtils.stampToString(file.lastModified)

      let _this = this
      EXIF.getData(file, function () {
        let data:any = EXIF.getAllTags(this)
        if (data && data.DateTimeDigitized) {
          imgShootTime = StringUtils.stampToString(data.DateTimeDigitized)
        }
        fileList.unshift({
          id: 0,
          imgKey: '',
          imgName: file.name,
          imgSize: (file.size / (1024 * 1024)).toFixed(2),
          imgShootTime: imgShootTime,
          file: file,
          remark: '',
          isUploading: false,
          isSuccess: false,
          isWaiting: true
        })

        if (fileList.length == files.length) {
          _this.getToken(fileList)
        }

      })
    }
  }


  /**
   * 获取七牛Token
   */
  getToken(fileList):void {

    if(this.isFetchingToken){
      alert('正在获取token,请等待...')
    }

    this.isFetchingToken = true
    let _this = this
    //批量获取token
    this.uploadService.getToken(this.customer.id, fileList.length)
      .then((token:any) => {
        _this.isFetchingToken = false
        _this.token = token.concat(_this.token)
        _this.fileList = fileList.concat(_this.fileList)

        _this.setFileListCb.emit(_this.fileList)
        //获取token成功,队列上传图片
        _this.uploadFile(_this.fileList.length - 1)
      })
  }


}
