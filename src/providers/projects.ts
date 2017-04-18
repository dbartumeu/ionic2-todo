import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable()
export class Projects {
  data: any;
  public projectsArr: Array<any>;

  constructor(public storage: Storage) {
  }

  getId = function () {
    return Date.now() + '';
  };

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

  save(data) {
    if (data.id) {
      return this.storage.ready().then(() => this.storage.set(data.id + '', data));
    } else {
      data.id = this.getId();
      return this.storage.ready().then(() => this.storage.set(data.id + '', data));
    }
  }

  remove(id) {
    return this.storage.ready().then(() => this.storage.remove(id + '').then(() => {
      return '';
    }));
  }

}
