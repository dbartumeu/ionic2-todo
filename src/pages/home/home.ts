import {Component} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';

import {Projects} from '../../providers/projects';
import {ProjectEditor} from '../project-editor/project-editor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public projects: Array<any>;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public projectsData: Projects) {

    this.getProjects();

  }

  getProjects() {
    this.projectsData.get().then((data) => {
      this.projects = data;
    });
  }

  addProject() {
    let prompt = this.alertCtrl.create({
      title: 'Add Project',
      message: "Enter a project name and press save button to create a new project",
      inputs: [
        {
          name: 'name',
          placeholder: 'Project Name'
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
            let sdata = this.projectsData.save({name: data.name});
            sdata.then(res => {
              console.log(res)
              this.getProjects();
            })
          }
        }
      ]
    });
    prompt.present();
  }

  editProject(project) {
    let modal = this.modalCtrl.create(ProjectEditor, {id: project.id});
    modal.onDidDismiss(data => {
      this.getProjects();
    });
    modal.present();
  }

}
