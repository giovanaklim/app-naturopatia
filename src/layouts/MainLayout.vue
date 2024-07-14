<template>
  <div>
    <div :class="isMobile ? 'tw-w-full' : 'tw-w-3/4'" class="row full-width items-center justify-center">
      <div :class="isMobile ? 'tw-hidden' : 'tw-block'" class=" col-6">
        <div class="row full-width">
          <div class="col-6">
            <div class="q-mb-lg full-width">
              <img alt="regiani-klim" class=" tw-h-auto tw-w-full tw-max-h-[260px] "
                   src="src/assets/public-layout/plant1.png">
            </div>
            <div class="full-width">
              <img alt="regiani-klim" class="tw-w-full tw-max-h-[540px]" src="src/assets/public-layout/plant3.png">
            </div>
          </div>
          <div class="col-4 q-ml-lg">
            <div class="q-mb-lg full-width">
              <img alt="regiani-klim" class="tw-h-[500px] tw-w-full" src="src/assets/public-layout/plant2.png">
            </div>
            <div class="full-width">
              <img alt="regiani-klim" class="tw-h-[160px] tw-w-full" src="src/assets/public-layout/plant4.png">
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 tw-items-start justify-center text-center">
        <div :class="isMobile ? 'tw-w-full' : 'tw-w-3/4'" class="row justify-center">
          <div class="row full-width justify-center">
            <img class=" tw-max-w-[100px] tw-mr-32" src="public/icons/logo_mae_roxo.svg">
          </div>
          <q-card class="q-pa-lg q-px-xl tw-rounded-xl text-h4 text-primary tw-font-extrabold">
            <span>{{ title }}</span>
          </q-card>
          <div v-if="errorMsg" class="text-secondary">{{ errorMsg }}</div>
          <div class="row tw-mt-10 tw-w-full tw-justify-center">
            <router-view :is-mobile="isMobile" @inputError="(val) => errorMsg = val"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Platform} from "quasar";
import {ref} from "vue";

const isMobile = !!Platform.is.mobile;
const errorMsg = ref('');
const title = ref('Login')
</script>
