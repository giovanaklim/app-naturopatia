<script setup lang="ts">
import {onMounted, ref} from "vue";
import {LoginForm} from "src/types/Auth/login";
import {getCsrfToken} from "src/services/Auth/csrf";
import {useUserStore} from "stores/user";
import {useRouter} from "vue-router";

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{
  (e: "inputError", errorMsg: string): void;
}>();

const form = ref<LoginForm>({
  email: '',
  password: '',
});

const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await getCsrfToken();
});

const onSubmit = async () => {
  try {
    loading.value = true
    const user = await userStore.login(form.value);
    loading.value = false

    if (user.type === 'admin') return router.push('/admin-panel')

    return router.push('/');
  } catch (e: any) {
    console.log(e)
    const message = e.response.data.message.split('messages.')
    emits('inputError', message[1])
    loading.value = false;

  }
}


</script>

<template>
  <q-card  class="tw-rounded-2xl tw-max-w-[500px] full-width tw-font-bold q-mx-none">
    <div class="row justify-center">
      <q-form class="tw-mt-10" @submit="onSubmit">
        <q-card-section>
          <q-input
            v-model="form.email"
            class="full-width q-pa-sm q-pl-md input tw-font-bold"
            label="Email"
            type="email"
            borderless
            required
          />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="form.password"
            class="full-width q-pa-sm q-pl-md input tw-font-bold"
            label="Senha"
            type="password"
            borderless
            required
          />
        </q-card-section>
        <q-card-actions class="row justify-center q-my-lg">
          <q-btn
              class=" tw-w-[200px]"
              color="purple"
              label="Entrar"
              :loading="loading"
              rounded
              size="lg"
              type="submit"
          />
        </q-card-actions>
      </q-form>
    </div>
  </q-card>

  <div class="row text-primary justify-end full-width text-subtitle2 q-pa-sm">
    <span>Não possuí um login?
      <br v-if="props.isMobile" />
      <span class="tw-underline cursor-pointer" :class="props.isMobile ? 'justify-end' : null" @click="router.push('/register')">Cadastre-se</span>
    </span>
  </div>

</template>

<style scoped>

</style>
