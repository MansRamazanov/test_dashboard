import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { DocumentItem } from '@/types/doc'
import { fetchDocuments } from '@/services/api'

export const useDocsStore = defineStore('docs', () => {
	const searchQuery = ref<string>('')
	const documents = ref<DocumentItem[]>([])
	const selectedDocumentId = ref<number | null>(null)
	const isLoading = ref<boolean>(false)
	const errorMessage = ref<string | null>(null)

	const selectedDocument = computed<DocumentItem | null>(() => {
		if (selectedDocumentId.value === null) return null
		return documents.value.find(d => d.id === selectedDocumentId.value) ?? null
	})

	async function searchDocs(query: string) {
		searchQuery.value = query
		isLoading.value = true
		errorMessage.value = null
		try {
			const list = await fetchDocuments(query)
			documents.value = list
			if (selectedDocumentId.value && !list.some(d => d.id === selectedDocumentId.value)) {
				selectedDocumentId.value = null
			}
		} catch (error: unknown) {
			errorMessage.value = error instanceof Error ? error.message : 'Не удалось загрузить документы'
			documents.value = []
		} finally {
			isLoading.value = false
		}
	}

	function selectDocument(documentId: number) {
		selectedDocumentId.value = documentId
	}

	function clearResults() {
		documents.value = []
		errorMessage.value = null
		isLoading.value = false
	}

	function deleteSelectedDocument() {
		if (!selectedDocument.value) return
		const doc = selectedDocument.value
		if (!doc.imageUrl) return
		documents.value = documents.value.filter(d => d.id !== doc.id)
		selectedDocumentId.value = null
	}

	return {
		searchQuery,
		documents,
		selectedDocumentId,
		isLoading,
		errorMessage,
		selectedDocument,
		searchDocs,
		selectDocument,
		clearResults,
		deleteSelectedDocument,
	}
})


