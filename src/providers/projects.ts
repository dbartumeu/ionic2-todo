import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable()
export class Projects {
  data: any;
  public projectsArr: Array<any>;

  constructor(public storage: Storage) {
    this.projectsArr = [];
  }

  getId = function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  get(id = null) {
    if (id) {
      this.storage.ready().then(() => {
        // Or to get a key/value pair
        return this.storage.get(id).then(data => {
          return data;
        });
      });
    } else {
      return this.storage.forEach((value, key, iterationNumber) => {
        this.projectsArr.push(value);
        return this.projectsArr;
      });
    }
  }

  save(data) {
    if (data.id) {
      return this.storage.set(data.id, data);
    } else {
      data.id = this.getId();
      return this.storage.set(data.id, data)
    }
  }

  remove() {

  }

}
