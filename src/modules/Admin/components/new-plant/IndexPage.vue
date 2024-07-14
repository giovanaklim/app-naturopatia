<script lang="ts" setup>
import {ref, watch} from "vue";
import {useQuasar} from "quasar";
import {usePlantStore} from "src/stores/plant"

const nextStep = ref(false)
const submitted = ref(false)
const store = usePlantStore()
const preview = ref('')
const hasfile = ref(false)
const plant_name = ref('')
const scientific_name = ref('')
const indications = ref<{ name: string }[]>([])
const contraindications = ref<{ name: string }[]>([])
const medicines = ref<{ name: string }[]>([])
const inputMedicines = ref('')
const inputContraindication = ref('')
const inputIndication = ref('')
const file = ref<File>()
const q = useQuasar()

const closeImage = () => {
  hasfile.value = false
  preview.value = ''
  file.value = {} as File
}
const handleFileChange = () => {
  if (file.value instanceof File) {
    hasfile.value = true
    const reader = new FileReader();
    reader.onloadend = () => {
      preview.value = reader.result as string;
    };
    reader.readAsDataURL(file.value);
  } else {
    return
  }
};
const includeIndications = (val: any) => {
  if (!indications.value.includes(val)) {
    indications.value.push(val)
    inputIndication.value = ''
  } else {
    const excludeIndex = indications.value.indexOf(val);
    indications.value.splice(excludeIndex, 1)
  }
}

const includeContraindications = (val: any) => {
  if (!contraindications.value.includes(val)) {
    contraindications.value.push(val)
    inputContraindication.value = ''
  } else {
    const excludeIndex = contraindications.value.indexOf(val);
    contraindications.value.splice(excludeIndex, 1)
  }
}
const includeMedicines = (val: any) => {
  if (!medicines.value.includes(val)) {
    medicines.value.push(val)
    inputMedicines.value = ''
  } else {
    const excludeIndex = medicines.value.indexOf(val);
    medicines.value.splice(excludeIndex, 1)
  }
}
const onSubmit = () => {
  submitted.value = true
  if (!plant_name.value || !scientific_name.value || !indications.value[0]) {
    return
  } else {
    nextStep.value = true
  }
}

const submit = async () => {
  if (!indications.value[0] || !contraindications.value[0] || !medicines.value[0]) {
    return
  }
  try {
    await store.addPlant({
      name: plant_name.value,
      scientific_name: scientific_name.value,
      indication: indications.value,
      contraindication: contraindications.value,
      medicines: medicines.value,
      file: file.value as File
    })
    q.notify({
      message: 'Planta cadastrada com sucesso!',
      color: 'positive',
      position: 'top',
      timeout: 2000 // tempo em milissegundos
    });
  } catch (e) {
    console.log(e)
    q.notify({
      message: 'Erro ao adicionar planta. Por favor, tente novamente mais tarde.',
      color: 'negative',
      position: 'top',
      timeout: 2000 // tempo em milissegundos
    });
  }
  await reset()
}

const reset = async () => {
  submitted.value = false
  plant_name.value = ''
  scientific_name.value = '',
    indications.value = [],
    contraindications.value = [],
    medicines.value = [],
    file.value = {} as File,
    preview.value = ''
  nextStep.value = false
  hasfile.value = false
}

watch(file, () => {
  handleFileChange()
});
</script>
<template>
  <div>
    <q-card
      class=" tw-p-4 tw-rounded-lg tw-w-[250px] sm:tw-w-[350px] md:tw-w-[450px] md:tw-max-h-[800px] tw-shadow-xl tw-border-2 tw-border-gray-300"
      flat>
      <div class="row tw-mt-3 full-width justify-center ">
        <q-card
          class="tw-cursor-pointer tw-rounded-lg tw-shadow-xl tw-w-[140px] tw-h-[134px] tw-border-2 tw-border-black md:tw-w-[200px] md:tw-h-[190px]"
          @click="$refs.plantFile.$el.click()">
          <q-avatar v-if="hasfile" class=" full-width tw-h-full">
            <img :src="preview" alt="regiani-klim">
            <q-badge floating>
              <q-btn class="tw-rounded-2xl" flat icon="cancel" @click.stop="closeImage"/>
            </q-badge>
          </q-avatar>
          <div class="row tw-h-full tw-w-full justify-center items-center">
            <q-icon
              v-if="!hasfile"
              class="tw-cursor-pointer"
              name="add"
              size="lg"
              style="position: absolute"
            >
            </q-icon>
            <q-file
              ref="plantFile"
              v-model="file"
              accept=".jpg, image/*"
              borderless
              class="tw-hidden"
            />
          </div>
        </q-card>
      </div>
      <div class="tw-mt-4">
        <q-form @submit="submit()">
          <div v-if="!nextStep" class="tw-grid tw-grid-rows-2 tw-gap-4 tw-align-middle tw-w-full">
            <div class="row full-width  justify-center">
              <q-input
                v-model="plant_name"
                :error="!plant_name && submitted"
                borderless
                class="input tw-pl-3 tw-my-2 tw-py-1 tw-font-bold md:tw-w-[350px]"
                error-message="Campo obrigatório!"
                label="Nome"
                @input="submitted = false"
              />
            </div>
            <div class="row full-width justify-center">
              <q-input
                v-model="scientific_name"
                :error="!scientific_name && submitted"
                borderless
                class="input tw-pl-3 tw-py-1 tw-my-2 tw-font-bold md:tw-w-[350px]"
                error-message="Campo obrigatório!"
                label="Nome Científico"
                @input="submitted = false"
              />
            </div>
            <div class="row full-width justify-center">
              <q-input
                v-model="inputIndication"
                :error="!indications[0] && submitted"
                borderless
                class="input tw-pl-3 tw-py-1 tw-my-2 tw-font-bold md:tw-w-[350px]"
                error-message="Campo obrigatório!"
                label="Indicações"
                @change="includeIndications(inputIndication)"
                @input="submitted = false"
              />
              <q-list class="row full-width justify-center tw-snap-x tw-snap-center" separator>
                <div v-for="(i, index) in indications" :key="index">
                  <q-item v-ripple class="tw-rounded-xl tw-my-1 tw-mx-1 tw-border-2 tw-border-gray-400" clickable
                          @click="includeIndications(i)">
                    <q-item-section>
                      {{ i }}
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
          </div>
          <div v-if="!nextStep" class="row tw-mt-1 full-width justify-center">
            <q-btn class="tw-rounded-lg tw-font-bold" color="primary" flat label="Continue" @click="onSubmit"/>
          </div>
          <div v-if="nextStep" class="tw-grid tw-grid-rows-2 tw-gap-4 tw-align-middle tw-w-full">
            <div class="row full-width justify-center">
              <q-input
                v-model="inputContraindication"
                :error="!contraindications[0] && submitted"
                borderless
                class="input tw-pl-3 tw-py-1 tw-my-2 tw-font-bold md:tw-w-[350px]"
                error-message="Campo obrigatório!"
                label="Contra-Indicações"
                @change="includeContraindications(inputContraindication)"
                @input="submitted = false"
              />
              <q-list class="row full-width justify-center" separator>
                <div v-for="(c, index) in contraindications" :key="index">
                  <q-item v-ripple class="tw-rounded-xl tw-my-1 tw-mx-1 tw-border-2 tw-border-gray-400" clickable
                          @click="includeContraindications(c)">
                    <q-item-section>
                      {{ c }}
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
            <div class="row full-width justify-center">
              <q-input
                v-model="inputMedicines"
                :error="!medicines[0] && submitted"
                borderless
                class="input tw-pl-3 tw-py-1 tw-my-2 tw-font-bold md:tw-w-[350px]"
                error-message="Campo obrigatório!"
                label="Interações Medicamentosas"
                @change="includeMedicines(inputMedicines)"
                @input="submitted = false"
              />
              <q-list class="row full-width justify-center" separator>
                <div v-for="(m, index) in medicines" :key="index">
                  <q-item v-ripple class="tw-rounded-xl tw-my-1 tw-mx-1 tw-border-2 tw-border-gray-400" clickable
                          @click="includeMedicines(m)">
                    <q-item-section>
                      {{ m }}
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
          </div>
          <div v-if="nextStep" class="row full-width justify-center">
            <q-btn class="tw-rounded-lg tw-font-bold" color="primary" flat label="Voltar" size="md"
                   @click="nextStep = false"/>
            <q-btn class="tw-rounded-lg tw-font-bold" color="purple" flat label="Adicionar" size="md" @click="submit"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>


<style lang="scss" scoped>
</style>
