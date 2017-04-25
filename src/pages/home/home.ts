import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Projects} from '../../providers/projects';
import {ProjectEditor} from '../project-editor/project-editor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public projects: Array<any>;

  constructor(public navCtrl: NavController,
              public projectsData: Projects) {
  }

  /**
   * Get all projects from storage
   */
  getProjects() {
    this.projectsData.get().then((data) => {
      this.projects = data;
    });
  }

  /**
   * Add or edit Project.
   * Navigate to Project Editor page and pass the project Id to add or edit the project.
   * @param project a project Object
   */
  addEditProject(project) {
    if (project)
      this.navCtrl.push(ProjectEditor, {id: project.id});
    else
      this.navCtrl.push(ProjectEditor, {id: null});
  }

  /**
   * Reload projects every time the view is active
   */
  ionViewWillEnter() {
    this.getProjects();
  }

}
