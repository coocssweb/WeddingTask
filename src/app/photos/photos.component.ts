import { Component } from '@angular/core';
import { Photo } from './photo'
@Component({
  selector: 'photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {

  //项目列表
  photoList = [
    {
      id: 1,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 2,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 3,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 4,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 5,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 6,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    },
    {
      id: 7,
      name: '原片#001',
      path: 'http://img4.imgtn.bdimg.com/it/u=847425578,1181496512&fm=21&gp=0.jpg',
      size: 1.23,
      time: '5:00',
      opinion: '脸修小一点点'
    }
  ]

  onDelete(index){
    this.photoList.splice(index, 1);
  }
}
