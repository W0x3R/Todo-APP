export const callClickEvents = (e, eventObject) => {
	const target = e.target
	for (const selector in eventObject) {
		if (target.closest(selector)) {
			eventObject[selector](e)
			break
		}
	}
}