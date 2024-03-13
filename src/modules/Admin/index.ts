import {Pinia} from "pinia";
import {adminRoutes} from "src/modules/Admin/routes";
import {Router} from "vue-router";

export class AdminModule {
  name: string;
  router: Router;
  store: Pinia

  constructor(router: Router, store: Pinia) {
    this.name = 'admin';
    this.router = router;
    this.store = store;
  }

  install() {
    adminRoutes.forEach((item) => {
      this.router.addRoute('Main', item)
    });
  }
}
