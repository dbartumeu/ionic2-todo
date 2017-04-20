import {Component} from '@angular/core';
import {NavParams, NavController, ToastController, AlertController} from 'ionic-angular';
import {Projects} from '../../providers/projects';

@Component({
  selector: 'page-project-editor',
  templateUrl: 'project-editor.html'
})
export class ProjectEditor {
  project;
  public newTask: string;
  public editingTask;

  constructor(public params: NavParams,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public projectsData: Projects) {

    let id = this.params ? this.params.get('id') : null;
    this.newTask = '';

    this.project = {
      name: '',
      tasks: [],
    };

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

  /**
   * Add new Task to the current project
   */
  addTask() {
    if (this.newTask) {
      this.project.tasks.push({
        id: this.projectsData.getId(),
        name: this.newTask,
        completed: false
      });

      this.saveProject(() => {
        this.newTask = '';
      });
    } else {

    }
  }

  /**
   * An Alias to saveProject, the project is saved every time a task is saved
   */
  saveTask() {
    this.saveProject(() => {
      this.editingTask = null;
    });
  }

  /**
   * Remove task from current project
   * @param Task
   */
  removeTask(Task) {
    this.project.tasks.forEach((task, i) => {
      if (task.id == Task.id) {
        this.project.tasks.splice(i, 1);
        this.saveProject(() => {
          let toast = this.toastCtrl.create({
            message: 'Task ' + Task.name + ' was deleted sucessfully',
            duration: 3000
          });
          toast.present();
        });
      }
    });
  }

  /**
   * TODO Add pipe to filter this
   * Return true if Task is being edited
   * @param Task
   * @returns {boolean}
   */
  showTaskEditor(Task) {

    if (this.editingTask && (Task.id == this.editingTask.id))
      return false;

    return true;

  }

  /**
   * Remove project from storage
   */
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
              this.project = {
                name: null,
                tasks: []
              }
              ;
              this.navCtrl.pop();
            })

          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Check if at least one task is completed
   * @returns {boolean}
   */
  checkForCompletedTasks() {
    let condition = false;

    this.project.tasks.forEach(task => {
      if (task.completed) {
        condition = true;
      }
    });

    return condition;
  }

  /**
   * Leave current view
   */
  ionViewCanLeave() {
    if (this.project.name) {
      console.log(this.project.name)
      this.saveProject(() => {
      });
    }
  }

}
