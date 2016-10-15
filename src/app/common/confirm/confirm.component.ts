import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: '<confirm></confirm>',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  @Input() title: string

  @Input() content: string

  @Output() confirm = new EventEmitter()

  @Output() cancel = new EventEmitter()

  onConfirm(){
    this.confirm.emit()
  }

  onCancel(){
    this.cancel.emit()
  }
}
