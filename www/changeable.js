function processVisibility(rootElement) {
	for (let element of rootElement.querySelectorAll('[data-showif]')) {
		console.log(element.getAttribute("data-showif"));
		try {
			/*if (eval(element.getAttribute("data-showif"))) {
				element.classList.remove("collapsed");
			} else {
				element.classList.add("collapsed");
			}*/
			
			element.classList[eval(element.getAttribute("data-showif"))?"remove":"add"]("collapsed");
			
		} catch (e) {
			console.log(e);
		}
	}
} 