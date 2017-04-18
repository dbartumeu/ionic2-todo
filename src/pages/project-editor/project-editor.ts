import {Component} from '@angular/core';
import {NavParams, ViewController, ToastController, AlertController} from 'ionic-angular';
import {Projects} from '../../providers/projects';

@Component({
  selector: 'page-home',
  templateUrl: 'project-editor.html'
})
export class ProjectEditor {
  project;
  public newTask: string;
  public editingTask;


  constructor(public params: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public projectsData: Projects) {

    let id = this.params ? this.params.get('id') : null;
    this.newTask = '';

    //Initializing project object
    this.project = {
      name: '',
      tasks: []
    }

    if (id) {
      projectsData.get(id).then(res => {
        this.project = res;
        if (!this.project.tasks)
          this.project.tasks = [];
      });
    }

  }

  /**
   * Save project
   * @param callback a callback of the form (item)
   */
  saveProject(callback: (item: any) => any) {
    this.projectsData.save(this.project).then(data => {
      callback(data);
    })
  }


  addTask() {
    if (this.newTask) {
      this.project.tasks.push({
        id: this.projectsData.getId(),
        name: this.newTask,
        completed: false
      });

      this.saveProject((item) => {
        this.newTask = '';
      });
    } else {

    }
  }


  editTask(Task) {
    this.editingTask = {...Task};
    console.log(this.editingTask)
  }

  saveTask(Task) {
    console.log(Task)
    this.saveProject((item) => {
      console.log(item)
      this.editingTask = null;
    });
  }

  removeTask(Task) {
    this.project.tasks.forEach((task, i) => {
      if (task.id == Task.id) {
        this.project.tasks.splice(i, 1);
        this.saveProject((item) => {
          let toast = this.toastCtrl.create({
            message: 'Task ' + Task.name + ' was deleted sucessfully',
            duration: 3000
          });
          toast.present();
        });
      }
    });
  }

  showTaskEditor(Task) {

    if (this.editingTask && (Task.id == this.editingTask.id))
      return false;

    return true;

  }

  removeProject() {
    let prompt = this.alertCtrl.create({
      title: 'Remove Project',
      message: "Do you wqnt to remove the project?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log(this.project.id);
            this.projectsData.remove(this.project.id).then(() => {
              this.viewCtrl.dismiss();
            })

          }
        }
      ]
    });
    prompt.present();
  }

  checkForCompletedTasks() {
    let condition = false;

    this.project.tasks.forEach(task => {
      if (task.completed) {
        condition = true;
      }
    });

    return condition;
  }

  dismiss() {
    if (this.project.name)
      this.saveProject(item => {
        this.viewCtrl.dismiss();
      })
    else
      this.viewCtrl.dismiss();
  }

}
