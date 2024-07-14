<script lang="ts" setup>
const props = defineProps({
  like: {
    type: Boolean,
    default: false
  },
  file_path: {
    type: String,
  },
  name: {
    type: String,
  },
  index: {
    type: Number,
    required: true
  }
})

const emits = defineEmits<{
  (e: "selectPlant", index: any): void;
}>();
</script>

<template>
  <div>
    <q-card
      class="tw-rounded-lg q-ma-md cursor-pointer hover:tw-shadow-xl hover:tw-shadow-purple-500 tw-max-w-[130px]"
      @click="emits('selectPlant', props.index)"
    >
      <q-badge
        v-if="props.like"
        class="bg-transparent q-mt-xl "
        floating
        style="position: absolute; bottom: 0; right: 0"
        z-index="1"
      >
        <q-icon color="purple" name="favorite" size="md"/>
      </q-badge>
      <div class="row full-width">
        <img :src="props.file_path" class="tw-w-[130px] tw-rounded-t-lg tw-h-[100px]">
      </div>
      <div class="row full-width">
        <q-card class="tw-rounded-lg full-width q-pa-xs">
          <div class="row full-width justify-center tw-font-semibold">
            {{ props.name }}
          </div>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>

</style>
