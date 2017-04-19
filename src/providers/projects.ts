import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable()
export class Projects {
  data: any;
  public projectsArr: Array<any>;

  constructor(public storage: Storage) {
  }

  /**
   * Generate a unique Id for each project
   * @returns {string}
   */
  getId = function () {
    return Date.now() + '';
  };

  /**
   * Get a Project or a list of projects from storage
   * @param id
   * @returns {Promise<Object>|Promise<Object[]>} Object if id is not null, array of projects otherwise
   */
  get(id = null) {
    if (id) {
      return this.storage.get(id + '');
    } else {
      this.projectsArr = [];
      return this.storage.forEach((value, key, iterationNumber) => {
        this.projectsArr.push(value);
      }).then(() => {
        return this.projectsArr;
      });
    }
  }

  /**
   * Save project
   * @param data
   * @returns {Promise<Promise<any>}
   */
  save(data) {
    if (data.id) {
      return this.storage.ready().then(() => this.storage.set(data.id + '', data));
    } else {
      data.id = this.getId();
      return this.storage.ready().then(() => this.storage.set(data.id + '', data));
    }
  }

  /**
   * Remove Project
   * @param id
   * @returns {Promise<string>}
   */
  remove(id) {
    return this.storage.ready().then(() => this.storage.remove(id + '').then(() => {
      return '';
    }));
  }

}
