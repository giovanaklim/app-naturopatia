<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "stores/user";

const userStore = useUserStore();
const user = userStore.user
const router = useRouter();

</script>
<template>
  <q-layout view="Ihh IpR Iff">
      <div class="row tw-w-full tw-justify-end tw-absolute tw-z-2">
        <div class="tw-col-span-1">
          <q-btn flat class="tw-z-50" icon="logout" round dense size="20px" @click="userStore.logout()"/>
        </div>
      </div>
      <router-view/>
  </q-layout>
</template>


<style scoped>

</style>
