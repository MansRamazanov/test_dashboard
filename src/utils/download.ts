export function downloadTextFile(filename: string, text: string, opts?: { bom?: boolean }) {
	const parts: BlobPart[] = []
	if (opts?.bom) {
		parts.push(new Uint8Array([0xef, 0xbb, 0xbf])) // UTF-8 BOM
	}
	parts.push(text ?? '')
	const blob = new Blob(parts, { type: 'text/plain;charset=utf-8' })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	a.remove()
	setTimeout(() => URL.revokeObjectURL(url), 0)
}


