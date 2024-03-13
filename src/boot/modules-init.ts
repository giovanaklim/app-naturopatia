import {boot, store} from 'quasar/wrappers'
import {AdminModule} from "src/modules/Admin";
import router from "src/router";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store } ) => {
  const adminModule = new AdminModule(router, store)
  adminModule.install()
})
