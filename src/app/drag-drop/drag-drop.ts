import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-drag-drop',
  imports: [ CdkDropList, CdkDrag ],
  templateUrl: './drag-drop.html',
  styleUrl: './drag-drop.css',
})
export class DragDrop {
  toPlan = ['one', 'two', 'three'];
  planned = ['four'];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

}
