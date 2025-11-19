<template>
    <div class="home">
        <div class="home__header">
            <h1 class="home__header-title">
                MyApp
            </h1>
            <div class="home__header-user">
                Username
            </div>
        </div>
        <div class="home__content">
            <DocumentsList />
            <DocumentInfo v-if="activeDocument !== null" :document="activeDocument" />
            <div v-else class="home__content-empty">
                Выберите документ, чтобы посмотреть его содержимое
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DocumentsList from '@/components/DocumentsList.vue'
import DocumentInfo from '@/components/DocumentInfo.vue'
import { storeToRefs } from 'pinia'
import { useDocsStore } from '@/stores/docs'

const store = useDocsStore()
const { selectedDocument: activeDocument } = storeToRefs(store)
</script>