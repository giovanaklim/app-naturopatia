<script setup lang="ts">
import {onMounted, ref} from "vue";
import {UserForm} from "src/types/Auth/login";
import {getCsrfToken} from "src/services/Auth/csrf";
import {useUserStore} from "stores/user";
import {useRouter} from "vue-router";

const emits = defineEmits<{
  (e: "inputError", errorMsg: string): void;
}>();

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const form = ref<UserForm>({
  name: '',
  email: '',
  password: '',
});

const loading = ref(false)
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  await getCsrfToken();
});

const onSubmit = async () => {
  try {
    loading.value = true
    await userStore.register(form.value);
    loading.value = false;

    return router.push('/');
  } catch (e: any) {
    const message = e.response.data.message.split('messages.')
    emits('inputError', message[1])
    loading.value = false;

  }
}


</script>

<template>
  <div>
    <q-card class="tw-rounded-2xl tw-min-w-[450px] q-py-md full-width tw-font-bold q-mx-none">
      <q-form class="tw-mt-10" @submit="onSubmit">
        <div class="q-mx-lg">
          <div class="row q-my-xl">
            <q-input
              v-model="form.name"
              class="full-width q-pa-sm q-pl-md input tw-font-bold"
              label="Nome"
              type="text"
              borderless
              required
              />
          </div>
          <div class="row q-my-xl">
            <q-input
              v-model="form.email"
              class="full-width q-pa-sm q-pl-md input tw-font-bold"
              label="Email"
              type="email"
              borderless
              required
            />
          </div>
          <div class="row q-my-xl">
            <q-input
              v-model="form.password"
              class="full-width q-pa-sm q-pl-md input tw-font-bold"
              label="Senha"
              type="password"
              borderless
              required
            />
          </div>
          <div class="row q-mt-xl q-mb-sm  justify-center ">
            <q-btn
              rounded
              class="bg-primary tw-w-[200px]"
              size="lg"
              color="purple"
              label="Cadastrar"
              type="submit"
            />
          </div>
        </div>
      </q-form>
    </q-card>
    <div class="row text-primary justify-end full-width text-subtitle2 q-pa-sm items-center">
      <span class="cursor-pointer" @click="router.push('/login')">
       Já possui um cadastro? Faça login</span>
    </div>
  </div>
</template>

<style scoped>

</style>
