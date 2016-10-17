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

  readFilePath(file, index){
    var reader = new FileReader();
    reader.onload = function(evt){
      (<HTMLInputElement>document.getElementById('image-'+index)).src = evt.target.result
    }
    reader.readAsDataURL(file);
  }

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
        opinion: ''
      })

      this.readFilePath(file, i)
    }

    this.photoList = fileInfoList.concat(this.photoList)
  }
}
