<script setup lang="ts">
import {ref, onMounted} from "vue";
import {usePlantStore} from "stores/plant";
import {useRouter} from "vue-router";

const router = useRouter();
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
const favorited = ref(false)

onMounted( async () => {
  plantsCollection.value = await store.getPlants()
  console.log(plantsCollection.value)
  selectedPlant.value = plantsCollection.value[0]
})
const selectPlant = (index: any) => {
  selectedPlant.value = plantsCollection.value[index]
}

const favorite = () => {
  store.plantLike(selectedPlant.value.id)
}

</script>

<template>
  <div>
    <img
      class="tw-max-h-[450px]"
      style="position: absolute; left: 0rem; bottom: 0rem"
      src="src/assets/public-layout/borboleta2.png"
    >
    <div class="row full-width justify-start">
      <q-icon
        class="q-ml-xl cursor-pointer"
        name="arrow_back_ios"
        size="xl"
        color="secondary"
        @click="router.push('/')"
      />
    </div>
    <div class="row full-width">
      <div class="col-7">
        <div class="row full-width justify-center">
          <span class="text-h4 tw-font-extrabold">
            Essas plantas foram feitas pra você!
          </span>
          <div class="q-mt-lg tw-grid tw-grid-cols-3">
            <div v-for="(plant, index) in plantsCollection" :key="index" >
              <q-card class="tw-rounded-lg q-ma-md cursor-pointer" @click="selectPlant(index)">
                <q-badge
                  class="bg-transparent q-mt-xl"
                  floating
                  style="position: absolute; bottom: 0; right: 0"
                  z-index="1"
                >
                  <q-icon size="xl" name="favorite" color="purple"/>
                </q-badge>
                <div class="row full-width">
                  <img :src="plant.file_path" class=" tw-w-[150px] tw-rounded-t-lg tw-h-[140px]">
                </div>
                <div class="row full-width">
                  <q-card class="tw-rounded-lg full-width q-pa-xs">
                    <div class="row full-width justify-center tw-font-semibold">
                      {{plant.name}}
                    </div>
                  </q-card>
                </div>
              </q-card>
            </div>
        </div>
        </div>
      </div>
      <div class="col">
        <div class="row full-width justify-center">
          <q-card class="tw-rounded-xl q-pa-sm">
            <div class="row full-width">
              <img :src="selectedPlant.file_path" class="tw-w-[500px] tw-max-h-[400px] tw-rounded-t-lg">
            </div>
            <div class="row text-h6 q-mt-md tw-font-extrabold full-width justify-center">
              {{ selectedPlant.name }} - {{ selectedPlant.scientific_name }}
            </div>
            <div class="row q-mb-lg full-width">
              <div class="col">
                <div class="q-ml-lg">
                  <div class="row full-width text-secondary tw-font-bold">
                    Indicações
                  </div>
                  <div class="row full-width"  v-for="(i, index) in selectedPlant.indication" :key="index" >
                    {{i.name}}
                  </div>
                </div>
                <div class="q-ml-lg">
                  <div class="row full-width text-secondary tw-font-bold">
                    Contra indicações
                  </div>
                  <div class="row full-width"  v-for="(c, index) in selectedPlant.contra_indication" :key="index" >
                    {{c.name}}
                  </div>
                </div>
                <div class="q-ml-lg ">
                  <div class="row full-width text-secondary tw-font-bold">
                    Interações Medicamentosas
                  </div>
                  <div class="row full-width"  v-for="(d, index) in selectedPlant.drug_interaction" :key="index" >
                    {{d.name}}
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="row full-height full-width justify-center">
<!--                  <q-icon-->
<!--                    class="q-mt-lg  cursor-pointer"-->
<!--                    :class="selectedPlant.plant_like.like ? '' : 'q-ml-xl' "-->
<!--                    :name="selectedPlant.plant_like.like ? 'favorite' : 'favorite_outlined'"-->
<!--                    color="purple"-->
<!--                    size="xl"-->
<!--                    @click="favorite"-->
<!--                  />-->
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="row full-width justify-center">
          <q-btn
            class="text-white q-mt-lg tw-w-[200px]"
            size="xl"
            rounded
            color="purple"
            no-caps
            @click="router.push('/')"
          >
            Concluir
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
