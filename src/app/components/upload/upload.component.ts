import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  @Output() previewPhoto = new EventEmitter()

  onClick(){
    document.getElementById('file-upload').click()
  }


  onFileChange(event: any){

    let files = (<HTMLInputElement>document.getElementById('file-upload')).files

    let fileList = []

    for(let i = 0; i< files.length; i++){
      fileList.push(files[i])
    }

    this.previewPhoto.emit(fileList)

  }

}
