var engine = {
    goToPage: function (pagename) {
		if (!story.pages.hasOwnProperty(pagename)){
			alert("Сторінка ще не написана");
			return;
		}
        document.getElementById("textframe").src = "pages/" + pagename + ".html";
		var list = document.getElementById("figures");
		list.innerHTML = "";
		story.pages[pagename].choices.forEach(element => {
			console.log(element.text);
			var li = document.createElement("li");
			li.innerText = element.text;
			li.addEventListener("click", function() {element.onselect(); engine.goToPage(element.nextpage);}, false);
			li.classList.add('clickable');
			list.appendChild(li);
		});
	}
}
var character = {
    stats: {
        reflexes: 0,
        strength: 0,
        intelligence: 0,
        charisma: 0,
		refresh: function() {
			["reflexes", "strength", "intelligence", "charisma"].forEach(name => {
				document.getElementById(name + "Stat").innerText = this[name];
			})
		},
		setReflexes: function(newValue) {
			this.reflexes = newValue;
			this.refresh();
		},
		
		setStrength: function(newValue) {
			this.strength = newValue;
			this.refresh();
		},
		
		setIntelligence: function(newValue) {
			this.intelligence = newValue;
			this.refresh();
		},
		
		setCharisma: function(newValue) {
			this.charisma = newValue;
			this.refresh();
		}
	},
    story: {
        page: ""
	},
    achievements: {}
}

var story = {
    pages: {
        backstory0: {
            choices: [{
				text: "Скаліченого воїна",
				nextpage: "backstory1_1",
				onselect: function () {
					character.stats.setStrength(1);
				}
                }, {
				text: "Хитрого пройдисвіта",
				nextpage: "backstory1_2",
				onselect: function () {
					character.stats.setReflexes(1);
				}
                }, {
				text: "Мудру босорку",
				nextpage: "backstory1_3",
				onselect: function () {
					character.stats.setIntelligence(1);
				}
                }, {
				text: "Сліпого кобзаря",
				nextpage: "backstory1_4",
				onselect: function () {
					character.stats.setCharisma(1);
				}
			}
            ]
		},
		backstory1_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory2",
				onselect: function () {}
			}]
		},
		backstory1_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory2",
				onselect: function () {}
			}]
		},
		backstory1_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory2",
				onselect: function () {}
			}]
		},
		backstory1_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory2",
				onselect: function () {}
			}]
		},
        backstory2: {
            choices: [{
				text: "Полювальником",
				nextpage: "backstory2_1",
				onselect: function () {
					character.stats.setStrength(1);
				}
                }, {
				text: "Гармашем",
				nextpage: "backstory2_2",
				onselect: function () {
					character.stats.setReflexes(1);
				}
                }, {
				text: "Писарем",
				nextpage: "backstory2_3",
				onselect: function () {
					character.stats.setIntelligence(1);
				}
                }, {
				text: "Мандруючим артистом",
				nextpage: "backstory2_4",
				onselect: function () {
					character.stats.setCharisma(1);
				}
			}
            ]
		},
		backstory2_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory3",
				onselect: function () {}
			}]
		},
		backstory2_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory3",
				onselect: function () {}
			}]
		},
		backstory2_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory3",
				onselect: function () {}
			}]
		},
		backstory2_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory3",
				onselect: function () {}
			}]
		},
        backstory3: {
            choices: [{
				text: "Козака",
				nextpage: "backstory3_1",
				onselect: function () {
					character.stats.setStrength(1);
				}
                }, {
				text: "Мисливця на відьом",
				nextpage: "backstory3_2",
				onselect: function () {
					character.stats.setReflexes(1);
				}
                }, {
				text: "Муляра",
				nextpage: "backstory3_3",
				onselect: function () {
					character.stats.setIntelligence(1);
				}
                }, {
				text: "Мавку",
				nextpage: "backstory3_4",
				onselect: function () {
					character.stats.setCharisma(1);
				}
			}
            ]
		},
		backstory3_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory4",
				onselect: function () {}
			}]
		},
		backstory3_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory4",
				onselect: function () {}
			}]
		},
		backstory3_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory4",
				onselect: function () {}
			}]
		},
		backstory3_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory4",
				onselect: function () {}
			}]
		},
        backstory4: {
            choices: [{
				text: "Фехтуванню",
				nextpage: "backstory4_1",
				onselect: function () {
					character.stats.setStrength(1);
				}
                }, {
				text: "Мистецтву бою",
				nextpage: "backstory4_2",
				onselect: function () {
					character.stats.setReflexes(1);
				}
                }, {
				text: "Святому писанню",
				nextpage: "backstory4_3",
				onselect: function () {
					character.stats.setIntelligence(1);
				}
                }, {
				text: "Красному слову",
				nextpage: "backstory4_4",
				onselect: function () {
					character.stats.setCharisma(1);
				}
			}
            ]
		},
		backstory4_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory5",
				onselect: function () {}
			}]
		},
		backstory4_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory5",
				onselect: function () {}
			}]
		},
		backstory4_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory5",
				onselect: function () {}
			}]
		},
		backstory4_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "backstory5",
				onselect: function () {}
			}]
		},
	}
};