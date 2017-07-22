import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { Task } from './task';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {

  tasks: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    this.tasks = db.list('/tasks');
  }

  addItem() {
    let theNewTask: string = prompt("New Task");
    if (theNewTask !== '') {
      this.tasks.push({
        title: theNewTask,
        status: 'open'
      });
    }
  }

  markAsDone(slidingiTem: ItemSliding, task: Task) {
    this.tasks.update(task.$key, { status: 'done' });
    slidingiTem.close();
  }

  removeTask(slidingiTem: ItemSliding, task: Task) {
    this.tasks.remove(task.$key);
    slidingiTem.close();
  }
}
