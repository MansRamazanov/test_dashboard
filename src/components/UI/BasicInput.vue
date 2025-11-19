<template>
    <div class="basic-input">
        <label v-if="label" for="input" class="basic-input__label">{{ label }}</label>
        <input id="input" type="text" :placeholder="placeholder" v-model="model" class="basic-input__input"/>
    </div>
</template>

<script setup lang="ts">
interface Props {
    label?: string
    placeholder: string
}
defineProps<Props>()

const model = defineModel<string>()
</script>