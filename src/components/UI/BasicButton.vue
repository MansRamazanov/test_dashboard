<template>
    <button :class="['basic-button', `basic-button__${type}`]" :disabled="disabled" @click="$emit('click')">
        {{ title }}
    </button>
</template>

<script setup lang="ts">
interface Props {
    title: string
    type: 'accept' | 'reject'
    disabled?: boolean
}
defineProps<Props>()
defineEmits<{ (e: 'click'): void }>()
</script>