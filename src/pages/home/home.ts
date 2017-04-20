import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Platform} from 'ionic-angular';

import {Projects} from '../../providers/projects';
import {ProjectEditor} from '../project-editor/project-editor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class HomePage {
  public projects: Array<any>;
  public cardWith: string;

  constructor(public navCtrl: NavController,
              public plt: Platform,
              public projectsData: Projects) {
    this.cardWith = this.getCardWidth();
  }

  /**
   * Get card width
   * @returns {string}
   */
  getCardWidth() {
    let currentWidth = this.plt.width();
    if (currentWidth < 400) {
      return (currentWidth / 2 - 10) + 'px'
    }
    if (currentWidth < 700) {
      return (currentWidth / 3 - 10) + 'px'
    }
    if (currentWidth < 1000) {
      return (currentWidth / 4 - 10) + 'px'
    }
    if (currentWidth < 1200) {
      return (currentWidth / 5 - 10) + 'px'
    }
    if (currentWidth > 1200) {
      return (currentWidth / 5 - 30) + 'px'
    }
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
   * Adjust card wisth on resize
   */
  onResize() {
    this.cardWith = this.getCardWidth();
  }

  /**
   * Reload projects every time the view is active
   */
  ionViewWillEnter() {
    this.getProjects();
  }

}
