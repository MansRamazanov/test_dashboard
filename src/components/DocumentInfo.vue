<template>
    <div class="document-info">
        <div class="document-info__image">
            <img v-if="document.imageUrl" :src="document.imageUrl" alt="document">
            <img v-else src="@/assets/images/document_img.png" alt="document">
        </div>
        <div class="document-info__content">
            <div class="document-info__content-title">
                {{ document.name }}
            </div>
            <div class="document-info__content-buttons">
                <BasicButton title="Скачать" type="accept" @click="download" />
                <BasicButton title="Удалить" type="reject" :disabled="!document.imageUrl" @click="remove" />
            </div>
            <div class="document-info__content-description">
                <div class="document-info__content-description-title">
                    Описание:
                </div>
                <div class="document-info__content-description-text">
                    {{ document.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BasicButton from './UI/BasicButton.vue'
import type { DocumentItem } from '@/types/doc'
import { useDocsStore } from '@/stores/docs'
import { downloadTextFile } from '@/utils/download'

interface Props {
    document: DocumentItem
    }

const props = defineProps<Props>()
const store = useDocsStore()


function download() {
    const candidates = [
        props.document.description,
        props.document.name,
    ]
    const picked = candidates.find(v => typeof v === 'string' && v.trim().length > 0) ?? ''
    const content = String(picked)
    const name = `${props.document.name || 'document'}.txt`
    downloadTextFile(name, content.length ? content : 'Нет содержимого', { bom: true })
}

function remove() {
    store.deleteSelectedDocument()
}
</script>