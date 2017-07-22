import { Component } from '@angular/core';
import { NavController, ItemSliding, Platform } from 'ionic-angular';
import { Task } from './task';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {

  tasks: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public db: AngularFireDatabase, 
              public dialogs: Dialogs,
              public platform: Platform) {
    this.tasks = db.list('/tasks');
  }

  addItem() {
    if (this.platform.is('cordova')) {
      this.dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '').then(theResult => {
        if((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
          this.tasks.push({
            title: theResult.input1,
            status: 'open'
          });
        }
      });
    } else {
      let theNewTask: string = prompt("New Task");
      if (theNewTask !== '') {
        this.tasks.push({
          title: theNewTask,
          status: 'open'
        });
      }
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
