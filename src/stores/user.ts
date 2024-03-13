import {defineStore} from 'pinia';
import {User} from "src/types/user";
import {LoginForm, UserForm} from "src/types/Auth/login";
import {login} from "src/services/Auth/login";
import {createUser} from "src/services/Auth/create-user";
import {logoutUser} from "src/services/Auth/logout";
import {isAuth} from "src/services/Auth/is-auth";
import {updateUser} from "src/services/Admin/update-user";
import {Company} from "src/types/Admin/company";
import {getCompany} from "src/services/Admin/get-company";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    company : {} as Company
  }),

  getters: {
    user (): User {
      return this.$state.user;
    },

    company (): Company {
      return this.$state.company;
    },

    isAdmin (): Boolean {
      return this.$state.user.type === 'admin'
    },

    isLogged (): Boolean{
      return !!this.user.id
    }
  },

  actions: {
    async login(form: LoginForm) {
      const response = await login(form);
      this.$state.user = response;

      return response;
    },

    async register(form: UserForm) {
      this.$state.user = await createUser(form);
    },

    async logout (){
      await logoutUser()
      window.location.reload()
    },

    async update(form: any, company: any) {
      const response = await updateUser(form, company);
      this.$state.user = response;
    },

    async getAuthUser() {
      const response = await isAuth();

      if (!response) return false;
      this.$state.user = response;

      return true;
    },

    async getCompany (){
      this.$state.company = await getCompany();
      return this.$state.company;
    }
  }
});
