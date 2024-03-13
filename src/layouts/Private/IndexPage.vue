<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "stores/user";

const userStore = useUserStore();
const user = userStore.user
const router = useRouter();

</script>
<template>
  <q-layout view="Ihh IpR Iff">
      <div class="row full-width justify-end">
        <q-btn v-if="user.type === 'admin'" flat class=" tw-z-50" round dense icon="person" size="20px" @click="router.push('/admin-panel')"/>
        <q-btn flat class="tw-z-50" icon="logout" round dense size="20px" @click="userStore.logout()">
        </q-btn>
      </div>
      <router-view/>
  </q-layout>
</template>


<style scoped>

</style>
