<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {SearchPlant} from "src/types/search-plant";
import {useRouter} from "vue-router";
import {usePlantStore} from "stores/plant";

const store = usePlantStore()
const router = useRouter()
const formSearchPlant = ref<SearchPlant>({
  symptoms: [],
  illnesses: [],
  medicines: []
})

const currentStep = ref(1)
const previousStep1 = ref<number[]>([])
const previousStep2 = ref<number[]>([])
const previousStep3 = ref<number[]>([])
const selected = ref<number[]>([])
const selectedSymptoms = ref<{ name: string }[]>([])
const selectedIllnesses = ref<{ name: string }[]>([])
const selectedMedicines = ref<{ name: string }[]>([])

const symptoms = ref([
  {name: 'Climatério/menopausa'},
  {name: 'Não possuo sintomas'},
  {name: 'Enxaqueca'},
  {name: 'Tontura'},
  {name: 'Cansaço excessivo'},
  {name: 'Baixa energia constante'},
  {name: 'Baixa libido'},
  {name: 'Dificuldade orgasmo'},
  {name: 'Falta de lubrificação'},
  {name: 'Sono leve'},
  {name: 'Acorda cansada'},
  {name: 'Irritação'},
  {name: 'Sentimento depressivo'},
  {name: 'Angústia'},
  {name: 'Confusão mental'},
  {name: 'Dificuldade de raciocínio'},
  {name: 'Palpitação'},
  {name: 'Atrofia vaginal'},
  {name: 'Ressecamento da pele'},
  {name: 'Dor de cabeça'},
  {name: 'Gases'},
  {name: 'Suores noturnos'},
  {name: 'Infecções bacterianas'},
  {name: 'Verminoses'},
  {name: 'Dores musculares'},
  {name: 'Dores articulares'},
  {name: 'Fadiga'},
  {name: 'Perda frequente de memória'},
  {name: 'Problemas de concentração'},
  {name: 'Má digestão'},
  {name: 'Aumento do apetite'},
  {name: 'Calorões'},
  {name: 'Suores intensos'},
  {name: 'Instabilidade emocional'},
  {name: 'Insonia'},
  {name: 'Inchaço'},
  {name: 'Ressecamento vaginal'},
  {name: 'Refluxo gastroesofágico'},
  {name: 'Ansiedade'},
  {name: 'Depressão'},
])
const illnesses = ref([
  {name: 'Não possuo nenhuma condição'},
  {name: 'Dermatite'},
  {name: 'Artrite'},
  {name: 'Osteoporose'},
  {name: 'Obstrução intestinal'},
  {name: 'Doenças Cardíacas'},
  {name: 'Alergia a menta'},
  {name: 'Fotossensibilidade'},
  {name: 'Distúrbios autoimunes'},
  {name: 'Hipotireoidismo'},
  {name: 'Alergia a amendoim'},
  {name: 'Diabetes tipo 1'},
  {name: 'Diabetes tipo 2'},
  {name: 'Alergia a latex'},
  {name: 'Problemas gastrointestinais'},
  {name: 'Alergia a cenoura'},
  {name: 'Problemas renais'},
  {name: 'Doenças hepáticas'},
  {name: 'Alergia a margaridas'},
  {name: 'Câncer'},
  {name: 'Histórico de câncer'},
  {name: 'Distúrbios hormonais graves'},
  {name: 'Distúrbios bipolares'},
  {name: 'Esquizofrenia'},
  {name: 'Epilepsia'},
])
const medicines = ref([
  {name: 'Não faço uso de medicamentos'},
  {name: 'Antiplaquetários'},
  {name: 'Suplementos de ferro'},
  {name: 'Medicamentos para refluxo ácido'},
  {name: 'Estatinas'},
  {name: 'Medicamentos para ansiedade'},
  {name: 'Medicamentos hipnóticos'},
  {name: 'Medicamentos para o fígado'},
  {name: 'Sedativos'},
  {name: 'Imunossupressores'},
  {name: 'Hormônios tireoidianos'},
  {name: 'Contraceptivos orais'},
  {name: 'Anticoagulantes'},
  {name: 'Medicamentos para diabetes'},
  {name: 'Medicamentos para pressão arterial'},
  {name: 'Reposição hormonal TRH'},
  {name: 'Medicamentos para câncer'},
  {name: 'Antidepressivos'},
  {name: 'Benzodiazepinicos'}
])

onMounted(async () => {
  sortedSymptoms()
  sortedIllnesses()
  sortedMedicines()
})

const sortedSymptoms = () => {
  symptoms.value = symptoms.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}
const sortedIllnesses = () => {
  illnesses.value = illnesses.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}
const sortedMedicines = () => {
  medicines.value = medicines.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}

const select = (index: any) => {
  if (!selected.value.includes(index)) {
    selected.value.push(index)
  } else {
    const selectedIndex = selected.value.indexOf(index);
    selected.value.splice(selectedIndex, 1)
  }
}
const nextStep = (values: any) => {
  onSubmit(values)
  switch (currentStep.value) {
    case 1:
      previousStep1.value = selected.value
      currentStep.value = currentStep.value + 1
      selected.value = previousStep2.value
      break
    case 2 :
      previousStep2.value = selected.value
      currentStep.value = currentStep.value + 1
      selected.value = previousStep3.value
      break
    case 3 :
      previousStep3.value = selected.value
  }
}
const stepBack = () => {
  switch (currentStep.value) {
    case 2 :
      selected.value = previousStep1.value
      break
    case 3 :
      selected.value = previousStep2.value
      break
  }
  currentStep.value = currentStep.value - 1
}

const onSubmit = (values: any) => {
  switch (currentStep.value) {
    case 1:
      for (let i = 0; i < values.length; i++) {
        selectedIllnesses.value.push(illnesses.value[values[i]])
      }
      break
    case 2:
      for (let i = 0; i < values.length; i++) {
        selectedSymptoms.value.push(symptoms.value[values[i]])
      }
      break
    case 3:
      for (let i = 0; i < values.length; i++) {
        selectedMedicines.value.push(medicines.value[values[i]])
      }
      submit()
      break
  }
}
const submit = () => {
  formSearchPlant.value.symptoms = selectedSymptoms.value
  formSearchPlant.value.illnesses = selectedIllnesses.value
  formSearchPlant.value.medicines = selectedMedicines.value

  previousStep3.value = []
  previousStep2.value = []
  previousStep1.value = []

  usePlantStore().searchPlants(formSearchPlant.value)
  router.push('/search-results')
}

const emits = defineEmits<{
  (e: "close", event: boolean): void;
}>();
const close = () => {
  emits("close", false)
}

</script>

<template>
  <div>
    <img class="tw-max-h-[750px]" src="src/assets/public-layout/right_plants.png"
         style="position: absolute; left: 0rem; bottom: 0rem">
    <img class="tw-max-h-[750px]" src="src/assets/public-layout/left_plants.png"
         style="position: absolute; right: 0rem; bottom: 0rem">
    <div class="row full-width full-height">
      <div class="row">
        <q-avatar class="cursor-pointer tw-ml-44 tw-mt-6">
          <img src="src/assets/public-layout/X.png" @click="close">
        </q-avatar>
      </div>
      <div class="row tw-my-6 full-width justify-center text-h5 text-center tw-font-bold">
        Antes de encontrar a sua planta, responda <br> algumas perguntinhas rápidas!
      </div>
      <div class="row full-width q-mt-md q-pb-md justify-center">
        <q-card class="tw-w-[500px]  tw-max-h-[300px]" flat>
          <div v-if="currentStep == 1" class="row full-width ">
            <div class="row full-width tw-text-xl  q-mb-sm">
              Você apresenta alguma dessas condições?
            </div>
            <div class="row full-width tw-text-md tw-max-h-[250px] tw-overflow-y-scroll scroll-bar">
              <div v-for="(illenesse, index) in illnesses" :key="index">
                <q-card
                  :class="selected.includes(index) ? ' tw-bg-green-50 tw-border-2 tw-border-green text-positive ' : ' text-purple '"
                  class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer"
                  @click="select(index)">
                  {{ illenesse.name }}
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="currentStep == 2" class="row full-width ">
            <div class="row full-width tw-text-xl  q-mb-sm">
              Quais desses sintomas você tem?
            </div>
            <div class="row full-width tw-text-md tw-max-h-[250px] tw-overflow-y-scroll scroll-bar">
              <div v-for="(symptom, index) in symptoms" :key="index">
                <q-card
                  :class="selected.includes(index) ? ' tw-bg-green-50 tw-border-2 tw-border-green text-positive ' : ' text-purple '"
                  class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer"
                  @click="select(index)">
                  {{ symptom.name }}
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="currentStep == 3" class="row full-width ">
            <div class="row full-width tw-text-xl  q-mb-sm">
              Você toma algum desses medicamentos?
            </div>
            <div class="row full-width tw-text-md tw-max-h-[250px] tw-overflow-y-scroll scroll-bar">
              <div v-for="(medicine, index) in medicines" :key="index">
                <q-card
                  :class="selected.includes(index) ? 'tw-bg-green-50 tw-border-2 tw-border-green text-positive ' : ' text-purple '"
                  class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer"
                  @click="select(index)">
                  {{ medicine.name }}
                </q-card>
              </div>
            </div>
          </div>
          <div class="row full-width tw-my-3">
            <q-btn v-if="currentStep != 1" color="secondary" flat icon="arrow_back" round size="lg" @click="stepBack"/>
            <q-space/>
            <q-btn v-if="currentStep != 3" :disable="selected.length == 0" color="secondary" flat icon="arrow_forward"
                   round
                   size="lg" @click="nextStep(selected)"></q-btn>
            <q-btn v-if="currentStep == 3" :disable="selected.length == 0" color="secondary" flat icon="search" round
                   size="lg" @click="nextStep(selected)"></q-btn>
          </div>
          <div class="row tw-w-full tw-justify-center">
            <q-avatar :color="currentStep >= 1 ? 'secondary' : 'accent'" class="text-white" round size="md">1</q-avatar>
            <img src="src/assets/public-layout/line.svg">
            <q-avatar :color="currentStep >= 2 ? 'secondary' : 'accent'" class="text-white" round size="md">2</q-avatar>
            <img src="src/assets/public-layout/line.svg">
            <q-avatar :color="currentStep >= 3 ? 'secondary' : 'accent'" class="text-white" round size="md">3</q-avatar>
          </div>
        </q-card>
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
