<template>
    <div :class="['list-item', { 'is-active': active }]">
        <div class="list-item__img">
            <img src="@/assets/images/item_img.png" alt="document">
        </div>
        <div class="list-item__content">
            <div class="list-item__content-title">
                {{ name }}
            </div>
            <div class="list-item__content-size">
                {{ size }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    name: string
    size: string
    active?: boolean
}
defineProps<Props>()
</script>