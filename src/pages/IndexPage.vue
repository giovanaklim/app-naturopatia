<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import Consultation from "../pages/Consultation/IndexPage.vue"

const router = useRouter()
const mouse_over = ref(-1)
const consultation = ref(false)
const cursos = ref([
  { name: 'Libído, cadê você?'},
  { name: 'Menopausa'},
  { name: 'Imunidade'},
])
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
  if (over){
    mouse_over.value = index
  }
  else{
    mouse_over.value = -1
  }
}

</script>

<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="row full-width q-mb-lg">
          <div >
            <img class="tw-h-auto tw-h-[380px] tw-w-full" src="src/assets/public-layout/plant5.png" alt="regiani-klim">
          </div>
          <div class="q-ml-lg" >
            <img class="tw-h-auto tw-h-[380px] tw-w-full"  src="src/assets/public-layout/plant6.png" alt="regiani-klim">
          </div>
        </div>
        <div class="row full-width">
          <div>
            <img class="tw-h-auto  tw-h-[380px] tw-w-full" src="src/assets/public-layout/plant7.png" alt="regiani-klim">
          </div>
          <div class="q-ml-lg">
            <img class="tw-h-auto tw-w-full tw-h-[280px]" src="src/assets/public-layout/plant8.png" alt="regiani-klim">
          </div>
        </div>
      </div>
      <div class="col-6">
       <div class="row full-width full-height q-mt-xl justify-center">
        <q-card flat class="q-mt-md">
          <q-card-section>
            <div class="row justify-end q-pa-none q-ma-none">
              <img src="public/icons/logo_mae.svg" alt="">
            </div>
            <span class="text-h2 tw-font-extrabold"> Olá lindona!</span>
            <q-separator class="q-my-lg bg-primary" />
          </q-card-section>
          <q-card-section>
            <div class="tw-text-center">
              <span class="text-h5" style="align-items: center"> <b>Eu</b> vou te ajudar a <b>encontrar a <br>  solução</b> para seus problemas <b>hoje!</b></span>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="row q-mt-md full-width justify-center">
              <q-btn class="text-white tw-font-bold tw-w-[300px] tw-rounded-xl" color="secondary" size="xl" no-caps @click="consultation = true">
                Iniciar
              </q-btn>
            </div>
          </q-card-actions>
        </q-card>
       </div>
      </div>
    </div>
    <img class="q-mt-xl" style="position: absolute; z-index:-1" src="src/assets/public-layout/borboleta.png" alt="">
    <div class="row full-width justify-center q-mt-xl">
      <span class="text-h2 q-mt-xl tw-font-extrabold"> Cursos </span>
    </div>
    <div class="row q-ma-xl full-width justify-center" >
      <div class="q-ma-xl q-pa-xl" v-for="(curso, index) in cursos" :key="index">
        <q-card
          class="tw-rounded-xl tw-cursor-pointer"
          @mouseover="mouseCheck(index, true)"
          @mouseout="mouseCheck(index, false)"
          :class="mouse_over== index ? ' tw-w-[400px] tw-h-[300px] ': ' tw-w-[300px] tw-h-[200px] '"
        >
          <div class="row tw-h-full tw-w-full justify-center items-center">
            <q-icon name="add" size="xl"></q-icon>
          </div>
        </q-card>
        <div class="row q-mt-md full-width justify-center">
          {{ curso.name }}
        </div>
      </div>
    </div>
    <div class="row full-width justify-center q-mt-xl">
      <div class="col-7">
        <div class="q-ml-xl">
          <div class="row full-width justify-center q-mt-xl">
            <span class="text-h2 q-mt-xl q-mb-xl tw-font-extrabold"> Contatos </span>
          </div>
          <div class="row full-width justify-center text-center text-h4 q-my-xl">
            Me acompanhe nas redes sociais! <br>
            Lá eu posto várias dicas e tutoriais, onde ensino <br> você a ser a sua melhor versão sempre!
          </div>
          <div class="row full-width justify-center text-center q-my-xl">
            <div class="q-mt-xl" v-for="(icon, index) in icons" :key="index">
              <q-avatar class="q-mx-md tw-cursor-pointer" square >
                <a :href="icon.link">
                  <img :src="icon.src" alt="">
                </a>
              </q-avatar>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <img src="src/assets/public-layout/phone.png" alt="">
      </div>
    </div>

    <q-dialog maximized v-model="consultation">
      <q-card class="full-width full-height">
        <consultation @close="consultation = false"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
</style>


