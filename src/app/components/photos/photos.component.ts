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

  //项目列表
  photoList: Photo [ ]

  constructor(private photoService: PhotoService) { }

  getPhotos(): void {
    this.photoService.getPhotos().then(photos => this.photoList = photos);
  }

  ngOnInit(): void {
    this.getPhotos()
  }

  removePhoto: Photo

  onDelete(photo){
    this.isShowConfirm = true
    this.removePhoto = photo
  }

  isShowConfirm = false

  onConfirm(){
    for(let i = 0; i< this.photoList.length; i++){
      if(this.photoList[i].id === this.removePhoto.id){
        this.photoList.splice(i,1)
        break
      }
    }

    this.isShowConfirm = false
  }

  onCancel(){
    this.isShowConfirm = false
  }
}
