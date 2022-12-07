var engine = {
    goToPage: function (pagename) {
		if (!story.pages.hasOwnProperty(pagename)){
			alert("Сторінка ще не написана");
			return;
		}
        document.getElementById("textframe").src = "pages/" + pagename + ".html";
		var list = document.getElementById("figures");
		list.innerHTML = "";
		story.pages[pagename].choices.filter(element => !element.hasOwnProperty("valid") || element.valid(character)).forEach(element => {
			var li = document.createElement("li");
			li.innerText = element.text;
			li.addEventListener("click", function() {element.onselect(); engine.goToPage(element.nextpage);}, false);
			li.classList.add('clickable');
			list.appendChild(li);
		});
		character.stats.refresh();
		playSound("sounds/book-close_mjzcqzeu.mp3")
	}
}

function playSound(url) {
	const audio = new Audio(url);
	audio.play();
}

var STRENGTH = "strength";
var REFLEXES = "reflexes";
var INTELLIGENCE = "intelligence";
var CHARISMA = "charisma";
var FENCING = "fencing";
var MARTIALARTS = "martialarts";
var HOLYMAGIC = "holymagic";
var HUNT_RESOURCES = "huntresources";
var HUNT_SKILLS = "huntskills";
var MAGIC_TOLERANCE = "magictolerance";
var NOBILITY_APPROVAL = "nobilityapproval";
var SINS = "sins";
var DECAY_POINTS = "decaypoints";

var statNames = [STRENGTH, REFLEXES, INTELLIGENCE, CHARISMA, FENCING, MARTIALARTS, HOLYMAGIC, HUNT_RESOURCES, HUNT_SKILLS, MAGIC_TOLERANCE, NOBILITY_APPROVAL, SINS, DECAY_POINTS];

var defaults = {
	strength: 0,
	reflexes: 0,
	intelligence: 0,
	charisma: 0,
	fencing: false,
	martialarts: false,
	holymagic: false,
	huntresources: 0,
	huntskills: 0,
	magictolerance: 0,
	nobilityapproval: 0,
	sins: 0,
	decaypoints: 0
};

var character = {
    stats: {
        reflexes: 0,
        strength: 0,
        intelligence: 0,
        charisma: 0,
		fencing: false,
		martialarts: false,
		holymagic: false,
		huntresources: 0,
		huntskills: 0,
		magictolerance: 0,
		nobilityapproval: 0,
		sins: 0,
		decaypoints: 0,
		
		refresh: function() {
			statNames.forEach(name => {
				document.getElementById(name + "Stat").innerText = this[name];
			})
		},
		setReflexes: function(newValue) {
			this.reflexes = newValue;
		},
		
		setStrength: function(newValue) {
			this.strength = newValue;
		},
		
		setIntelligence: function(newValue) {
			this.intelligence = newValue;
		},
		
		setCharisma: function(newValue) {
			this.charisma = newValue;
		},
		setStats: function(newStats) {
			statNames.forEach(name => {
				if (newStats.hasOwnProperty(name))
					this[name] = newStats[name];
			});
		},
		
		resetStats: function(newStats) {
			statNames.forEach(name => {
				if (newStats.hasOwnProperty(name))
					this[name] = newStats[name];
				else 
					this[name] = defaults[name];
			});
		},
		
		increase: function(statName) {
			this[statName]++;
		},
		decrease: function(statName) {
			this[statName]--;
		},
		
		increaseBy: function(statName, x) {
			this[statName]+=x;
		},
		decreaseBy: function(statName, x) {
			this[statName]-=x;
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
					character.stats.resetStats({strength: 1});
				}
                }, {
				text: "Хитрого пройдисвіта",
				nextpage: "backstory1_2",
				onselect: function () {
					character.stats.resetStats({reflexes: 1});
				}
                }, {
				text: "Мудру босорку",
				nextpage: "backstory1_3",
				onselect: function () {
				character.stats.resetStats({intelligence: 1});
				}
                }, {
				text: "Сліпого кобзаря",
				nextpage: "backstory1_4",
				onselect: function () {
					character.stats.resetStats({charisma: 1});
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
				character.stats.increase(REFLEXES);
				}
			// ,valid: character => character.stats.strength > 0
                }, {
				text: "Гармашем",
				nextpage: "backstory2_2",
				onselect: function () {
					character.stats.increase(STRENGTH);
				}
                }, {
				text: "Писарем",
				nextpage: "backstory2_3",
				onselect: function () {
					character.stats.increase(INTELLIGENCE);
				}
                }, {
				text: "Мандруючим артистом",
				nextpage: "backstory2_4",
				onselect: function () {
					character.stats.increase(CHARISMA);
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