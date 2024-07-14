<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import newPlant from '../components/new-plant/IndexPage.vue'
import {useUserStore} from "stores/user";

const editData = ref(false);
const userStore = useUserStore();
const user = userStore.user;
const company = ref(userStore.company);

const submit = async () => {
  await userStore.update(user, company.value)
  reset()
}
const reset = () => {
  editData.value = false
}

const onsubmit = async () => {
  editData.value = !editData.value
}

async function getCompanies() {
  company.value = await userStore.getCompany()
}

onBeforeMount(() => {
  getCompanies()
})
</script>

<template>
  <div class="tw-bg-white">
    <div class="row full-height full-width justify-center items-center">
      <div class="tw-my-2 row tw-w-full justify-center lg:tw-w-1/3 lg:tw-mt-5 lg:tw-mr-10">
        <div class="row justify-center full-width">
          <!--          <img-->
          <!--            class=" tw-max-w-[50px] tw-mb-20 sm:tw-max-w-[100px] sm:tw-mb-20 lg:tw-max-w-[120px] lg:tw-z-10"-->
          <!--            src="public/icons/logo_mae.svg"-->
          <!--          >-->
          <img alt="regiani-klim" class="tw-w-[120px] tw-mt-5 sm:tw-w-[150px] md:tw-w-[200px] lg:tw-mt-0"
               src="public/img/foto_regiani.svg">
        </div>
        <div class="row tw-mt-2 full-width tw-justify-center tw-text-lg tw-font-bold sm:tw-text-2xl lg:tw-text-3xl">
          <span v-if="!editData">{{ user.name }}</span>
          <q-input
            v-if="editData"
            v-model="user.name"
            :borderless="!editData"
            class="tw-max-w-[300px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
            dense
            input-style="color:gray"
            required
          >
            <template v-slot:before>
              <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg">Nome:</span>
            </template>
          </q-input>
        </div>
        <div class="tw-grid tw-ml-4 tw-mt-6 tw-grid-rows-3 tw-gap-1
        tw-w-full tw-justify-center sm:tw-gap-3 sm:tw-mt-5 md:tw-mt-10"
        >
          <div>
            <q-input
              v-model="user.email"
              :borderless="!editData"
              :readonly="!editData"
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              dense
              input-style="color:gray"
              required
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg">Email:</span>
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              v-model="company.email"
              :borderless="!editData"
              :readonly="!editData"
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              dense
              input-style="color:gray"
              required
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg">Email Suporte:</span>
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              v-model="company.phone"
              :borderless="!editData"
              :readonly="!editData"
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              dense
              input-style="color:gray"
              mask="(##)#####-####"
              required
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg">Telefone Suporte:</span>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row full-width justify-center tw-mt-10">
          <q-btn v-if="!editData" class="tw-rounded-3xl tw-h-[50px] md:tw-h-[60px] md:tw-w-[200px] md:tw-text-xl"
                 color="secondary" no-caps outline @click="onsubmit">Editar perfil
          </q-btn>
          <q-btn v-if="editData" class="tw-rounded-3xl tw-h-[50px] md:tw-h-[60px] md:tw-w-[200px] md:tw-text-xl"
                 color="secondary"
                 no-caps outline @click="submit">Concluir
          </q-btn>
        </div>
      </div>
      <div class="tw-my-2 sm:tw-mt-10 row tw-w-full justify-center sm:tw-w-1/2 lg:tw-w-1/3">
        <div class="row full-width tw-my-5 sm:tw-mt-0 justify-center">
          <span class="tw-text-lg md:tw-text-xl lg:tw-text-2xl tw-font-bold">Insira uma nova planta</span>
        </div>
        <div class="row full-width  full-height tw-mt-2 sm:tw-mt-0 justify-center items-center">
          <new-plant/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
