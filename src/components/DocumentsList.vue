<template>
    <div class="documents-list">
        <div class="documents-list__search">
            <BasicInput label="Поиск документа" placeholder="Введите ID документа" v-model="searchValue" />
        </div>
        <div class="documents-list__items">
            <div class="documents-list__items-title">
                Результаты
            </div>
            <div v-if="hasQuery" class="documents-list__items-list">
                <div v-if="isLoading">Загрузка...</div>
                <div v-else-if="errorMessage" class="documents-list__error">{{ errorMessage }}</div>
                <template v-else>
                    <ListItem v-for="item in docs" :key="item.id" :name="item.name" size="2 MB" @click="activateDocument(item.id)" />
                    <div v-if="!docs.length" class="documents-list__items-list-empty">Ничего не найдено</div>
                </template>
            </div>
            <div v-else class="documents-list__items-list">
                <div class="documents-list__items-list-empty">
                    Ничего не найдено
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BasicInput from './UI/BasicInput.vue'
import ListItem from './ListItem.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useDocsStore } from '@/stores/docs'
import { debounce } from '@/utils/debounce'

const searchValue = ref<string>('')
const store = useDocsStore()
const docs = computed(() => store.documents)
const isLoading = computed(() => store.isLoading)
const errorMessage = computed(() => store.errorMessage)
const hasQuery = computed(() => searchValue.value.trim().length > 0)

const runSearch = debounce((value: string) => {
    store.searchDocs(value)
}, 400)

watch(searchValue, (value) => {
    const v = value.trim()
    if (v.length > 0) {
        runSearch(v)
    } else {
        store.clearResults()
    }
})

onMounted(() => {
    if (store.searchQuery) {
        searchValue.value = store.searchQuery
    }
})

const activateDocument = (id: number) => {
    store.selectDocument(id)
}
</script>