import {Component} from '@angular/core';
import {NavController, AlertController,  ModalController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {}


  addProject() {
    console.log('add project');
    let prompt = this.alertCtrl.create({
      title: 'Add Project',
      message: "Enter a project name and press save button to create a new project",
      inputs: [
        {
          name: 'projectName',
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  editProject() {
    console.log('tets')
  }

}
