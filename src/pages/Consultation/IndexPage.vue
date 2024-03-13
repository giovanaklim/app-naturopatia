<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {SearchPlant} from "src/types/search-plant";
import {useRouter} from "vue-router";
import {usePlantStore} from "stores/plant";

const store = usePlantStore()
const router = useRouter();
const currentStep = ref(1)
const selected = ref<number[]>([])

const previousStep1 =  ref<number[]>([])
const previousStep2 =  ref<number[]>([])
const previousStep3 =  ref<number[]>([])

const formSearchPlant = ref<SearchPlant>({
  symptoms: [],
  illnesses: [],
  medicines:[]
})
const selectedSymptoms = ref<{ name: string }[]>([])
const selectedIllnesses = ref<{ name: string }[]>([])
const selectedMedicines = ref<{ name: string }[]>([])
const symptoms = ref([
  {name: 'Climatério/menopausa'},
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
])

onMounted( async () => {
  sortedSymptoms()
  sortedIllnesses()
  sortedMedicines()
})
const onSubmit = (values: any) => {
  switch (currentStep.value) {
    case 1:
      for (let i = 0; i < values.length; i++) {
        selectedSymptoms.value.push(symptoms.value[values[i]])
      }
      break
    case 2:
      for (let i = 0; i < values.length; i++) {
        selectedIllnesses.value.push(illnesses.value[values[i]])
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
const select = (index: any) => {
  if(!selected.value.includes(index)){
    selected.value.push(index)
  }
  else {
    const selectedIndex = selected.value.indexOf(index);
    selected.value.splice(selectedIndex, 1)
  }
}

const  sortedSymptoms = () => {
  symptoms.value = symptoms.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}

const  sortedIllnesses = () => {
  illnesses.value = illnesses.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}

const  sortedMedicines = () => {
  medicines.value = medicines.value.slice().sort((a, b) => a.name.localeCompare(b.name));
}
const nextStep = (values: any) => {
  onSubmit(values)
  switch (currentStep.value){
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
  switch (currentStep.value){
    case 2 :
      selected.value =  previousStep1.value
      break
    case 3 :
      selected.value =  previousStep2.value
      break
  }
  currentStep.value = currentStep.value - 1
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
    <img class="tw-max-h-[750px]" style="position: absolute; left: 0rem; bottom: 0rem" src="src/assets/public-layout/right_plants.png">
    <img class="tw-max-h-[750px]" style="position: absolute; right: 0rem; bottom: 0rem" src="src/assets/public-layout/left_plants.png">
    <div class="row full-width full-height">
      <div class="row  q-ml-xl q-mt-xl">
        <q-avatar class="cursor-pointer q-ml-xl q-mb-xl" >
          <img src="src/assets/public-layout/X.png"  @click="close">
        </q-avatar>
      </div>
      <div class="row full-width justify-center text-h4 text-center tw-font-bold">
        Antes de encontrar a sua planta, responda <br> algumas perguntinhas rápidas!
      </div>
      <div class="row full-width q-mt-xl q-pb-xl justify-center">
        <q-card flat class="tw-w-[500px]  tw-max-h-[300px]">
          <div v-if="currentStep == 1" class="row full-width ">
            <div class="row full-width text-h6 q-mb-sm">
              Quais desses sintomas você tem?
            </div>
            <div class="row full-width text-h6 q-mb-sm tw-max-h-[200px] tw-overflow-y-auto">
              <div v-for="(symptom, index) in symptoms" :key="index">
                <q-card class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer" :class="selected.includes(index) ? ' bg-positiveLight text-positive ' : ' text-purple '" @click="select(index)">
                  {{symptom.name}}
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="currentStep == 2" class="row full-width ">
            <div class="row full-width text-h6 q-mb-sm">
              Você apresenta alguma dessas condições?
            </div>
            <div class="row full-width text-h6 q-mb-sm tw-max-h-[200px] tw-overflow-y-auto">
              <div v-for="(illenesse, index) in illnesses" :key="index">
                <q-card class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer" :class="selected.includes(index) ? ' bg-positiveLight text-positive ' : ' text-purple '" @click="select(index)">
                  {{illenesse.name}}
                </q-card>
              </div>
            </div>
          </div>
          <div v-if="currentStep == 3" class="row full-width ">
            <div class="row full-width text-h6 q-mb-sm">
              Você toma algum desses medicamentos?
            </div>
            <div class="row full-width text-h6 q-mb-sm tw-max-h-[200px] tw-overflow-y-auto">
              <div v-for="(medicine, index) in medicines" :key="index">
                <q-card class="tw-rounded-xl q-py-xs q-px-sm q-ma-sm cursor-pointer" :class="selected.includes(index) ? ' bg-positiveLight text-positive ' : ' text-purple '" @click="select(index)">
                  {{medicine.name}}
                </q-card>
              </div>
            </div>
          </div>
          <div class="row full-width q-mt-xl">
            <q-btn round v-if="currentStep != 1"  icon="arrow_back" flat color="secondary" size="xl" @click="stepBack"/>
            <q-space/>
            <q-btn round v-if="currentStep != 3" icon="arrow_forward" flat color="secondary" size="xl" :disable="selected.length == 0" @click="nextStep(selected)"></q-btn>
            <q-btn round v-if="currentStep == 3" icon="search" flat color="secondary" size="xl" :disable="selected.length == 0" @click="nextStep(selected)"></q-btn>
          </div>
          <div class="row full-width tw-mt-md">
            <q-avatar size="lg" :color="currentStep >= 1 ? 'secondary' : 'accent'" round class="q-ml-md q-mt-xl text-white">1</q-avatar>
            <img class="q-mt-xl" src="src/assets/public-layout/line.svg">
            <q-avatar class="text-white q-mt-xl" size="lg" round :color="currentStep >= 2 ? 'secondary' : 'accent'">2</q-avatar>
            <img class="q-mt-xl" src="src/assets/public-layout/line.svg">
            <q-avatar class="text-white q-mt-xl" size="lg" round :color="currentStep >= 3 ? 'secondary' : 'accent'">3</q-avatar>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>
