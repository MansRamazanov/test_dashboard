import type { DocumentItem } from '@/types/doc'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://test-app-csm.up.railway.app'

type RawDocument = {
	id: number 
	name: string
	description: string
	image: string | null
}

function normalizeDocument(raw: RawDocument): DocumentItem {
	return {
		id: raw.id,
		name: raw.name ?? 'Без названия',
		description: raw.description ?? '',
		imageUrl: raw.image,
	}
}

export async function fetchDocuments(search: string): Promise<DocumentItem[]> {
	const url = new URL('/user/docs', BASE_URL)
	if (search) {
		url.searchParams.set('search', search)
	}
	const response = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}
	const data = await response.json()
	const list = Array.isArray(data) ? data : (data?.docs ?? [])
	return list.map(normalizeDocument)
}


