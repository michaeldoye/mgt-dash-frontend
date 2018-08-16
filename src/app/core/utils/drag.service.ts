import { Injectable } from '@angular/core';
import { CdkDragDrop, CdkDrop, moveItemInArray, transferArrayItem } from '@angular/cdk-experimental/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  public childConnector: CdkDrop;
  public parentConnector: CdkDrop;

  setChildConnector(childRef: CdkDrop) {
    this.childConnector = childRef;
  }

  setParentConnector(parentRef: CdkDrop) {
    this.parentConnector = parentRef;
  }

  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('transfer');
      console.log(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
