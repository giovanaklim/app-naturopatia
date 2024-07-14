<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import Consultation from "../pages/Consultation/IndexPage.vue"
import {Platform} from "quasar";

const isMobile = !!Platform.is.mobile;
const router = useRouter()
const mouse_over = ref(-1)
const consultation = ref(false)
const icons = ref([
  {
    src: 'src/assets/public-layout/whatsapp.svg',
    link: ''
  },
  {
    src: 'src/assets/public-layout/instagram.svg',
    link: 'https://www.instagram.com/regiani.klim/'
  },
  {
    src: 'src/assets/public-layout/tiktok.svg',
    link: 'https://www.tiktok.com/@regianiklim'
  },
  {
    src: 'src/assets/public-layout/youtube.svg',
    link: 'https://www.youtube.com/@regiani.klim.menopausanatural'
  },
])


const mouseCheck = (index: any, over: any) => {
  if (over) {
    mouse_over.value = index
  } else {
    mouse_over.value = -1
  }
}

</script>

<template>
  <div>
    <div class="row">
      <div v-if="!isMobile" class="col">
        <div class="row full-width q-mb-lg">
          <div>
            <img alt="regiani-klim" class="tw-h-[280px] tw-w-full" src="src/assets/public-layout/plant5.png">
          </div>
          <div class="q-ml-lg">
            <img alt="regiani-klim" class="tw-h-[280px] tw-w-full" src="src/assets/public-layout/plant6.png">
          </div>
        </div>
        <div class="row full-width">
          <div>
            <img alt="regiani-klim" class="tw-h-[300px] tw-w-full" src="src/assets/public-layout/plant7.png">
          </div>
          <div class="q-ml-lg">
            <img alt="regiani-klim" class="tw-h-auto tw-w-full tw-h-[200px]" src="src/assets/public-layout/plant8.png">
          </div>
        </div>
      </div>
      <div class="col-6 tw-justify-center tw-items-center">
        <div class="row full-width full-height q-mt-md justify-center">
          <q-card flat>
            <q-card-section>
              <div class="row justify-end q-pa-none q-ma-none">
                <img alt="" src="public/icons/logo_mae.svg">
              </div>
              <span class="text-h3 tw-font-extrabold"> Olá lindona!</span>
              <q-separator class="q-my-lg bg-primary"/>
            </q-card-section>
            <q-card-section>
              <div class="tw-text-center">
                <span class="text-h5" style="align-items: center"> <b>Eu</b> vou te ajudar a <b>encontrar a <br>  solução</b> para seus problemas <b>hoje!</b></span>
              </div>
            </q-card-section>
            <q-card-actions>
              <div class="row q-mt-md full-width justify-center">
                <q-btn class="text-white tw-font-bold tw-w-[300px] tw-rounded-xl" color="secondary" no-caps size="xl"
                       @click="consultation = true">
                  Iniciar
                </q-btn>
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <!--    <img class="q-mt-xl" style="position: absolute; z-index:-1" src="src/assets/public-layout/borboleta.png" alt="">-->
    <div class="row full-width justify-center tw-mt-24">
      <div class="col-7">
        <div class="q-ml-xl">
          <div class="row full-width justify-center q-mt-xl">
            <span class="text-h3 q-mt-xl q-mb-xl tw-font-extrabold"> Contatos </span>
          </div>
          <div class="row full-width justify-center text-center text-h5 q-my-xl">
            Me acompanhe nas redes sociais! <br>
            Lá eu posto várias dicas e tutoriais, onde ensino <br> você a ser a sua melhor versão sempre!
          </div>
          <div class="row full-width justify-center text-center q-my-xl">
            <div v-for="(icon, index) in icons" :key="index" class="q-mt-xl">
              <q-avatar class="q-mx-md tw-cursor-pointer" square>
                <a :href="icon.link">
                  <img :src="icon.src" alt="">
                </a>
              </q-avatar>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <img alt="" src="src/assets/public-layout/phone.png">
      </div>
    </div>

    <q-dialog v-model="consultation" maximized>
      <q-card class="full-width full-height">
        <consultation @close="consultation = false"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
</style>


