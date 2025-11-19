export function debounce<A extends unknown[]>(fn: (...args: A) => void, wait = 400) {
	let timeoutId: number | undefined
	return (...args: A) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = window.setTimeout(() => {
			fn(...args)
		}, wait)
	}
}


