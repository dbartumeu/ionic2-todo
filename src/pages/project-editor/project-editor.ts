import {Component} from '@angular/core';
import {NavParams, ViewController, ToastController, AlertController} from 'ionic-angular';
import {Projects} from '../../providers/projects';

@Component({
  selector: 'page-home',
  templateUrl: 'project-editor.html'
})
export class ProjectEditor {
  project;
  projectName;
  tasks;
  public newTask: string;
  public editingTask;


  constructor(public params: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public projectsData: Projects) {

    let id = this.params.get('id');
    this.tasks = [];
    this.newTask = '';

    projectsData.get(id).then(res => {
      this.project = res;
      this.projectName = res.name;
      if (res.tasks)
        this.tasks = res.tasks;
    })

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
      this.tasks.push({
        id: this.projectsData.getId(),
        name: this.newTask,
        completed: false
      });

      this.project.tasks = this.tasks;
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

    this.saveProject((item) => {
      this.editingTask = null;
    });
    console.log(this.editingTask)
  }

  removeTask(Task) {
    this.project.tasks.forEach((task, i) => {
      if (task.id == Task.id) {
        this.project.tasks.splice(i, 1);
        this.saveProject((item) => {
          this.tasks = this.project.tasks;
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

  renameProject() {
    let prompt = this.alertCtrl.create({
      title: 'Rename Project',
      message: "Enter a project name and press save button to rename the project",
      inputs: [
        {
          name: 'name',
          placeholder: 'Project Name',
          value: this.project.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.project.name = this.projectName = data.name
            this.saveProject(() => {
            });
          }
        }
      ]
    })
    prompt.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
