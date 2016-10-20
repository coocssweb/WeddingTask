import { Component, OnInit } from '@angular/core'
import { Photo } from './photo'
import { PhotoService } from '../../services/photos.service'
@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService]
})
export class PhotosComponent implements OnInit{


  confirmTitle: string = '确认删除?';

  confirmContent: string = '确认删除这条数据吗？'

  //图片列表
  photoList: Photo [ ]

  constructor(private photoService: PhotoService) { }

  //获取图片列表
  getPhotos(): void {
    this.photoService.getPhotos().then(photos => this.photoList = photos);
  }

  ngOnInit(): void {
    this.getPhotos()
  }

  //当前要删除的图片信息
  removePhoto: Photo

  //删除原片
  onDelete(photo){
    this.isShowConfirm = true
    this.removePhoto = photo
  }


  //是否显示删除确认框
  isShowConfirm = false

  //确认事件
  onConfirm(){
    for(let i = 0; i< this.photoList.length; i++){
      if(this.photoList[i].id === this.removePhoto.id){
        this.photoList.splice(i,1)
        break
      }
    }

    this.isShowConfirm = false
  }

  //关闭确认框
  onCancel(){
    this.isShowConfirm = false
  }


  //读取图片预览图地址
  readFilePath(file, index){
    var reader = new FileReader();
    reader.onload = function(evt){
      (<HTMLInputElement>document.getElementById('image-'+index)).src = evt.target.result
    }
    reader.readAsDataURL(file);
  }

  //预览emit回调
  previewPhoto(fileList){

    let fileInfoList = []

    for(let i=0; i< fileList.length; i++){
      let file = fileList[i]
      fileInfoList.push({
        id: 0,
        path: '',
        name: file.name,
        size: (file.size / (1024*1024)).toFixed(2),
        time: '6:00',
        opinion: '',
        isActive: true,
        isWaiting: true
      })

      this.readFilePath(file, i)
    }

    this.photoList = fileInfoList.concat(this.photoList)
  }
}
