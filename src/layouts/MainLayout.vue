<template>
  <div >
    <div class="row full-width items-center justify-center" :class="isMobile ? 'tw-w-full' : 'tw-w-3/4'">
      <div class=" col-6" :class="isMobile ? 'tw-hidden' : 'tw-block'">
        <div class="row full-width">
          <div class="col-6">
            <div class="q-mb-lg full-width">
              <img class=" tw-h-auto tw-w-full tw-max-h-[360px] " src="src/assets/public-layout/plant1.png" alt="regiani-klim">
            </div>
            <div class="full-width">
              <img class="tw-w-full tw-max-h-[500px]"  src="src/assets/public-layout/plant3.png" alt="regiani-klim">
            </div>
          </div>
          <div class="col-4 q-ml-lg">
            <div class="q-mb-lg full-width">
              <img class="tw-h-[600px] tw-w-full" src="src/assets/public-layout/plant2.png" alt="regiani-klim">
            </div>
            <div class="full-width">
              <img class="tw-h-[260px] tw-w-full" src="src/assets/public-layout/plant4.png" alt="regiani-klim">
            </div>
          </div>
        </div>
      </div>
      <div class=" col-6 tw-items-center justify-center text-center">
        <div class="row justify-center  q-mt-xl" :class="isMobile ? 'tw-w-full' : 'tw-w-3/4'">
          <div class="row full-width q-pr-xl justify-center">
            <img class="q-mr-xl tw-max-w-[100px]" src="public/icons/logo_mae_roxo.svg">
          </div>
          <div class="row full-width justify-center">
            <q-card class="q-pa-lg q-px-xl tw-rounded-xl text-h4 text-primary tw-font-extrabold">
             <span>{{title}}</span>
            </q-card>
          </div>
          <div v-if="errorMsg" class="text-secondary q-mt-xl">{{errorMsg}}</div>
          <div class="row q-mt-xl">
            <router-view :is-mobile="isMobile" @inputError="(val) => errorMsg = val" />
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
