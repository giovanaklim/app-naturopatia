<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {usePlantStore} from "stores/plant";
import {useRouter} from "vue-router";
import Plant_card from "components/plant_card.vue";

const indexPlant = ref(0)
const router = useRouter()
const store = usePlantStore()

const plantsCollection = ref<any>([])
const selectedPlant = ref({
  name: '',
  scientific_name: '',
  indication: ref<{ name: string }[]>([]),
  contraindication: ref<{ name: string }[]>([]),
  medicines: ref<{ name: string }[]>([]),
  file: {} as File,
})

onBeforeMount(async () => {
  plantsCollection.value = await store.getPlants()
  selectedPlant.value = plantsCollection.value[0]
})
const selectPlant = (index: any) => {
  indexPlant.value = index
  selectedPlant.value = plantsCollection.value[index]
}

const favorite = (async (id: any) => {
  await store.plantLike(id)
  reloadPlants(indexPlant.value)
})

const reloadPlants = (async (index: any) => {
  plantsCollection.value = await store.getPlants()
  selectedPlant.value = plantsCollection.value[index]
})

</script>

<template>
  <div>
    <img
      class="tw-max-h-[300px]"
      src="src/assets/public-layout/borboleta2.png"
      style="position: absolute; left: 0rem; bottom: 0rem"
    >
    <div class="row full-width justify-start">
      <q-icon
        class="q-ml-xl cursor-pointer tw-mt-10 "
        color="secondary"
        name="arrow_back_ios"
        size="md"
        @click="router.push('/')"
      />
    </div>
    <div class="row full-width">
      <div class="col-6">
        <div class="row full-width justify-center">
          <span class="text-h5 tw-font-extrabold">
            Essas plantas foram feitas pra você!
          </span>
          <div class="tw-justify-center tw-mt-4 tw-grid tw-grid-cols-3 tw-overflow-y-scroll tw-h-[70vh] scroll-bar">
            <div v-for="(plant, index) in plantsCollection" :key="index">
              <plant_card
                :file_path="plant.file_path"
                :index="index"
                :like="plant.plant_like.like"
                :name="plant.name"
                @select-plant="selectPlant(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="row tw-w-full tw-justify-center">
          <q-card bordered class="tw-rounded-xl tw-shadow-xl tw-border-2 tw-w-[550px]" flat>
            <div class="row tw-w-full tw-items-center tw-ml-4 tw-mt-4">
              <img :src="selectedPlant.file_path" class="tw-rounded-2xl tw-max-w-[100px]">
              <span class="tw-text-lg tw-ml-3 tw-font-extrabold">{{ selectedPlant.name }} - {{
                  selectedPlant.scientific_name
                }}</span>
            </div>
            <q-separator class="tw-my-4"/>
            <div class="row tw-w-full tw-p-6 tw-justify-center">
              <div class="col">
                <div class="row full-width">
                  <div class="row full-width tw-text-sm text-secondary tw-font-bold">
                    Indicações
                  </div>
                  <div v-if="selectedPlant.indication[0]" class="tw-text-xs tw-overflow-y-scroll tw-h-[50%] scroll-bar">
                    <div v-for="(i, index) in selectedPlant.indication" :key="index" class="row full-width">
                      {{ i.name }}
                    </div>
                  </div>
                  <div v-else class="tw-text-xs">
                    Essa planta não possui indicações!
                  </div>
                </div>
              </div>
              <div class="col-4 tw-ml-2">
                <div class="row tw-text-sm full-width  text-secondary tw-font-bold">
                  Interações Medicamentosas
                </div>
                <div
                  v-if="selectedPlant.drug_interaction[0]"
                  class="tw-overflow-y-scroll tw-text-xs tw-h-[200px] scroll-bar"
                >
                  <div v-for="(d, index) in selectedPlant.drug_interaction" :key="index" class="row full-width">
                    {{ d.name }}
                  </div>
                </div>
                <div v-else class="tw-text-xs">
                  Essa planta não possui interações medicamentosas!
                </div>
              </div>
              <div class="col">
                <div class="row full-width text-secondary tw-font-bold tw-text-sm">
                  Contra indicações
                </div>
                <div v-if="selectedPlant.contra_indication[0] "
                     class=" tw-text-xs tw-overflow-y-scroll tw-h-[50%] scroll-bar">
                  <div v-for="(c, index) in selectedPlant.contra_indication" :key="index" class="row full-width">
                    {{ c.name }}
                  </div>
                </div>
                <div v-else class="tw-text-xs">
                  Essa planta não possui contra indicações!
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.scroll-bar::-webkit-scrollbar {
  width: 10px;
  opacity: 0;
}

.scroll-bar::-webkit-scrollbar-thumb {
  //background-color: rgba(23, 106, 229, 0.2);
  border: none;
  background-color: #FF9BD1;
  border-radius: 5px;
}

.scroll-bar::-webkit-scrollbar-thumb:hover {
  background-color: #FF3BA5;
  border: none;
  border-radius: 5px;
}

</style>
