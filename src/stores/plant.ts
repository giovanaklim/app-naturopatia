import {defineStore} from "pinia";
import {NewPlant} from "src/types/Admin/new-plant";
import {newPlant} from "src/services/Admin/new-plant";
import {getPlants} from "src/services/get-plants";
import {SearchPlant} from "src/types/search-plant";
import {updatePlantLike} from "src/services/update-plant-like";
import {getAllPlants} from "src/services/get-all-plants";


export const usePlantStore = defineStore('plant', {
  state: () => ({
    plant: {} as NewPlant,
    plantsResult: [] as NewPlant[],
    searchPlant: {} as SearchPlant
  }),

  getters: {
    plant(): NewPlant {
      return this.plant;
    },
  },


  actions: {
    async addPlant(form: any) {
      const response = await newPlant(form);
      this.$state.plant = response;
      return response;
    },

    async searchPlants(form: SearchPlant) {
      this.searchPlant = form;
      return this.searchPlant;
    },

    async plantLike(id: any) {
      return await updatePlantLike(id);

    },

    async getPlants() {
      return await getPlants(this.searchPlant);
    },

    async getAllPlants() {
      return await getAllPlants();
    }
  }
});
