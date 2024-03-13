<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import newPlant from '../components/new-plant/IndexPage.vue'
import {useUserStore} from "stores/user";
const message = ref('Alterar Senha?');
const editData = ref(false);
const editPassword = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const userStore = useUserStore();
const user = userStore.user;
const company = ref(userStore.company);

const submit = async () => {
  await userStore.update(user, company.value)
  reset()
}
const reset = () => {
  editData.value = false
  editPassword.value = false
  newPassword.value = ''
  confirmPassword.value = ''
}

const onsubmit = async () => {
  editData.value = !editData.value
}

watch(editPassword, () => {
    if (editPassword.value == true) {
        message.value = 'Alterando Senha';
    }else{
        message.value = 'Alterar Senha?';
    }
});

async function getCompanies(){
   company.value =  await userStore.getCompany()
}

onBeforeMount(() => {
  getCompanies()
})
</script>

<template>
  <div class="tw-bg-white">
    <div class="row full-height full-width justify-center items-center">
      <div class="tw-my-2 row tw-w-full justify-center lg:tw-w-1/3 lg:tw-mt-5">
        <div class="row justify-center full-width">
          <img
            class=" tw-max-w-[50px]
             tw-mb-20
              sm:tw-max-w-[100px]
               sm:tw-mb-20
                lg:tw-max-w-[120px]
                 lg:tw-z-10
                  lg:tw-fixed
                    lg:tw-mr-[300px]
                     lg:tw-mb-[150px]"
             src="public/icons/logo_mae.svg"
          >
          <img class="tw-w-[120px] tw-mr-12 sm:tw-w-[150px] md:tw-w-[200px] sm:tw-mr-28 lg:tw-mr-0 " alt="regiani-klim" src="public/img/rounded_foto_perfil_Giovana_corrected.png">
        </div>
        <div class="row tw-mt-2 full-width tw-justify-center tw-text-lg tw-font-bold sm:tw-text-2xl lg:tw-text-3xl">
          <span v-if="!editData">{{user.name}}</span>
          <q-input
            v-if="editData"
            v-model="user.name"
            class="tw-max-w-[300px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
            input-style="color:gray"
            dense
            required
            :borderless="editData ? false : true"
          >
            <template v-slot:before>
              <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg" >Nome:</span>
            </template>
          </q-input>
        </div>
        <div class="tw-grid tw-ml-4 tw-mt-6 tw-grid-rows-3 tw-gap-1
        tw-w-full tw-justify-center sm:tw-gap-3 sm:tw-mt-5 md:tw-mt-10"
        >
          <div>
            <q-input
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              v-model="user.email"
              input-style="color:gray"
              dense
              required
              :borderless="editData ? false : true"
              :readonly="!editData"
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg" >Email:</span>
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              v-model="company.email"
              input-style="color:gray"
              dense
              required
              :borderless="editData ? false : true"
              :readonly="!editData"
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg" >Email Suporte:</span>
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              class="tw-max-w-[280px] md:tw-text-lg lg:tw-text-xl lg:tw-max-w-[500px]"
              v-model="company.phone"
              input-style="color:gray"
              dense
              required
              :borderless="editData ? false : true"
              :readonly="!editData"
              mask="(##)#####-####"
            >
              <template v-slot:before>
                <span class="tw-text-sm tw-font-bold text-primary md:tw-text-lg" >Telefone Suporte:</span>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row full-width justify-center tw-mt-10">
          <q-btn v-if="!editData" class="tw-rounded-3xl tw-h-[50px] md:tw-h-[60px] md:tw-w-[200px] md:tw-text-xl" no-caps color="secondary" outline @click="onsubmit">Editar perfil</q-btn>
          <q-btn v-if="editData" class="tw-rounded-3xl tw-h-[50px] md:tw-h-[60px] md:tw-w-[200px] md:tw-text-xl" no-caps color="secondary" outline @click="submit">Concluir</q-btn>
        </div>
      </div>
      <div class="tw-my-2 sm:tw-mt-16 row tw-w-full justify-center sm:tw-w-1/2 lg:tw-w-1/3">
        <div class="row full-width tw-mt-10 sm:tw-mt-0 justify-center">
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
