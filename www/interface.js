var interfaceFunctions = {
	processPage: function() {
		processVisibility(document.getElementById('textframe').contentWindow.document);
	},
	
	onFirstPageLoad: function() {
		if (load()) engine.goToPage(character.stats.currentPage);
		else 		engine.goToPage("backstory0");
	
		document.getElementById("textframe").addEventListener("load", this.processPage);
		this.processPage();
	}
}

var menu = {
	open: function() {document.getElementById("menu_container").classList.add("visible");},
	close: function() {document.getElementById("menu_container").classList.remove("visible");},
};