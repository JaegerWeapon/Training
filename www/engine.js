var engine = {
    goToPage: function (pagename) {
		if (!story.pages.hasOwnProperty(pagename)){
			alert("Сторінка ще не написана");
			return;
		}
		
		character.currentPage = pagename;
		
        document.getElementById("textframe").src = "pages/" + pagename + ".html";
		var list = document.getElementById("figures");
		list.innerHTML = "";
		story.pages[pagename].choices.filter(element => !element.hasOwnProperty("valid") || element.valid(character)).forEach((element, index) => {
			var li = document.createElement("li");
			li.innerText = element.text;
			li.addEventListener("click", function() {character.history[pagename] = index; element.onselect(); engine.goToPage(element.nextpage);}, false);
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
	
	history: {},
	
	currentPage: "",
	
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
		},
		skillOn: function(statName) {
			this[statName]=true;
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
					character.stats.increase(REFLEXES);
				}
                }, {
				text: "Мисливця на відьом",
				nextpage: "backstory3_2",
				onselect: function () {
					character.stats.increase(INTELLIGENCE);;
				}
                }, {
				text: "Муляра",
				nextpage: "backstory3_3",
				onselect: function () {
					character.stats.increase(STRENGTH);
				}
                }, {
				text: "Мавку",
				nextpage: "backstory3_4",
				onselect: function () {
					character.stats.increase(CHARISMA);
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
					character.stats.skillOn(FENCING);
				}
                }, {
				text: "Мистецтву бою",
				nextpage: "backstory4_2",
				onselect: function () {
					character.stats.skillOn(MARTIALARTS);
				}
                }, {
				text: "Святому писанню",
				nextpage: "backstory4_3",
				onselect: function () {
					character.stats.skillOn(HOLYMAGIC);
				}
                }, {
				text: "Красному слову",
				nextpage: "backstory4_4",
				onselect: function () {
					character.stats.increaseBy(CHARISMA, 2);
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
		backstory5: {
            choices: [{
				text: "Врятували принцесу ціною свого здоров’я",
				nextpage: "backstory5_1",
				onselect: function () {
					character.stats.increase(REFLEXES);
					character.stats.decrease(STRENGTH);
				}
                }, {
				text: "Оприлюднили на суді особистість злодія що крав королівське золото",
				nextpage: "backstory5_2",
				onselect: function () {
					character.stats.increase(CHARISMA);
					character.stats.decrease(INTELLIGENCE);
				}
                }, {
				text: "Розкопали архівні документи що свідчать в користь королеви",
				nextpage: "backstory5_3",
				onselect: function () {
					character.stats.increase(INTELLIGENCE);
					character.stats.decrease(REFLEXES);
				}
                }, {
				text: "Взяли на себе провинність за злочин королівської родини",
				nextpage: "backstory5_4",
				onselect: function () {
					character.stats.increase(STRENGTH);
					character.stats.increase(SINS);
				}
			}
            ]
		},
		backstory5_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne6",
				onselect: function () {}
			}]
		},
		backstory5_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne6",
				onselect: function () {}
			}]
		},
		backstory5_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne6",
				onselect: function () {}
			}]
		},
		backstory5_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne6",
				onselect: function () {}
			}]
		},
		ChapterOne6: {
            choices: [{
				text: "Відправити до монастиря",
				nextpage: "ChapterOne6_1",
				valid: character => character.stats.holymagic,
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Тримати деякий час під арештом",
				nextpage: "ChapterOne6_2",
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
					character.stats.decreaseBy(NOBILITY_APPROVAL, 10);
				}
                }, {
				text: "Відпустити",
				nextpage: "ChapterOne6_3",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
				}
			}, 
            ]
		},
		ChapterOne6_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne7",
				onselect: function () {}
			}]
		},
		ChapterOne6_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne7",
				onselect: function () {}
			}]
		},
		ChapterOne6_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne7",
				onselect: function () {}
			}]
		},
		ChapterOne7: {
            choices: [{
				text: "Заманити грошима",
				nextpage: "ChapterOne7_1",
				onselect: function () {
					character.stats.increaseBy(HUNT_RESOURCES, 10);
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
                }, {
				text: "Призвати допомогти мирним чаклунам",
				nextpage: "ChapterOne7_2",
				onselect: function () {
					character.stats.increaseBy(HUNT_RESOURCES, 20);
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
					character.stats.decreaseBy(HUNT_SKILLS, 10);
					
				}
                }, {
				text: "Оголосити що це потрібно короні",
				nextpage: "ChapterOne7_3",
				onselect: function () {
					character.stats.increaseBy(HUNT_RESOURCES, 20);
					character.stats.increaseBy(NOBILITY_APPROVAL, 10);
					character.stats.decreaseBy(HUNT_SKILLS, 10);
				}
                }, {
				text: "Призвати до боротьби проти магії",
				nextpage: "ChapterOne7_4",
				onselect: function () {
					character.stats.increaseBy(HUNT_RESOURCES, 30);
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
					character.stats.decreaseBy(HUNT_SKILLS, 10);
				}
			}
            ]
		},
		ChapterOne7_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne8",
				onselect: function () {}
			}]
		},
		ChapterOne7_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne8",
				onselect: function () {}
			}]
		},
		ChapterOne7_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne8",
				onselect: function () {}
			}]
		},
		ChapterOne7_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne8",
				onselect: function () {}
			}]
		},
		ChapterOne8: {
            choices: [{
				text: "Заборонити їй чаклувати",
				nextpage: "ChapterOne8_1",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Ігнорувати",
				nextpage: "ChapterOne8_2",
				onselect: function () {
					character.stats.increaseBy(NOBILITY_APPROVAL, 10);
					character.stats.increase(SINS);	
				}
                }, {
				text: "Відправити до академії",
				nextpage: "ChapterOne8_3",
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
				}
                }, {
				text: "Зробити ліцензію",
				nextpage: "ChapterOne8_4",
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
				}
			}
            ]
		},
		ChapterOne8_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne9",
				onselect: function () {}
			}]
		},
		ChapterOne8_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne9",
				onselect: function () {}
			}]
		},
		ChapterOne8_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne9",
				onselect: function () {}
			}]
		},
		ChapterOne8_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne9",
				onselect: function () {}
			}]
		},
		ChapterOne9: {
            choices: [{
				text: "Вбити",
				nextpage: "ChapterOne9_1",
				valid: character => character.stats.fencing,
				onselect: function () {
					character.stats.decreaseBy(NOBILITY_APPROVAL, 10);
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Утихомирити святим словом",
				nextpage: "ChapterOne9_2",
				valid: character => character.stats.holymagic,
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
						
				}
                }, {
				text: "Заламати та утихомирити",
				nextpage: "ChapterOne9_3",
				valid: character => character.stats.martialarts,
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Відпустити",
				nextpage: "ChapterOne9_4",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
					character.stats.increase(SINS);
				}
			}, {
				text: "Накинутись гуртома",
				nextpage: "ChapterOne9_5",
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 20);
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
			}
            ]
		},
		ChapterOne9_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne10",
				onselect: function () {}
			}]
		},
		ChapterOne9_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne10",
				onselect: function () {}
			}]
		},
		ChapterOne9_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne10",
				onselect: function () {}
			}]
		},
		ChapterOne9_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne10",
				onselect: function () {}
			}]
		},
		ChapterOne9_5: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterOne10",
				onselect: function () {}
			}]
		},
				ChapterOne10: {
				choices: [{
				text: "Церковні трактати",
				nextpage: "ChapterOne10_1",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
					character.stats.increaseBy(HUNT_SKILLS, 20);
				}
                }, {
				text: "Книги по фехтуванню",
				nextpage: "ChapterOne10_2",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
                }, {
				text: "Зробити власні дослідження",
				nextpage: "ChapterOne10_3",
				//valid: function () {return character.history.backstory2 == 2;},
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 30);
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
				}
			}
            ]
		},
		ChapterOne10_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo11",
				onselect: function () {}
			}]
		},
		ChapterOne10_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo11",
				onselect: function () {}
			}]
		},
		ChapterOne10_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo11",
				onselect: function () {}
			}]
		},
		ChapterTwo11: {
            choices: [{
				text: "Кота",
				nextpage: "ChapterTwo11_1",
				valid: character => character.stats.reflexes > 2,
				onselect: function () {

				}
                }, {
				text: "Філіна",
				nextpage: "ChapterTwo11_2",
				valid: character => character.stats.intelligence > 2,
				onselect: function () {

						
				}
                }, {
				text: "Бика",
				nextpage: "ChapterTwo11_3",
				valid: character => character.stats.strength > 2,
				onselect: function () {

				}
                }, {
				text: "Соловейки",
				valid: character => character.stats.charisma > 2,
				nextpage: "ChapterTwo11_4",
				onselect: function () {

				}
				}, {
				text: "Духа",
				nextpage: "ChapterTwo11_5",
				onselect: function () {

				}
			}
            ]
		},
		ChapterTwo11_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo12",
				onselect: function () {}
			}]
		},
		ChapterTwo11_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo12",
				onselect: function () {}
			}]
		},
		ChapterTwo11_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo12",
				onselect: function () {}
			}]
		},
		ChapterTwo11_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo12",
				onselect: function () {}
			}]
		},
		ChapterTwo11_5: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo12",
				onselect: function () {}
			}]
		},
		ChapterTwo12: {
            choices: [{
				text: "Знайомствами зі шляхтою",
				nextpage: "ChapterTwo12_1",
				onselect: function () {
					character.stats.increaseBy(NOBILITY_APPROVAL, 10);
				}
                }, {
				text: "Дбалим спостереженням",
				nextpage: "ChapterTwo12_2",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
                }, {
				text: "Агітацією за магію",
				nextpage: "ChapterTwo12_3",
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Агітацією проти магії",
				nextpage: "ChapterTwo12_4",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
				}
			}
            ]
		},
		ChapterTwo12_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo12_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo12_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo12_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo13: {
            choices: [{
				text: "Прийняти допомогу",
				nextpage: "ChapterTwo13_1",
				onselect: function () {
					
				}
                }, {
				text: "Відмовитися від допомоги",
				nextpage: "ChapterTwo13_2",
				onselect: function () {
					
				}
                }, {
				text: "Прийняти та фліртувати",
				nextpage: "ChapterTwo13_3",
				valid: character => character.stats.charisma >= 4,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterTwo13_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo13_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo13_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo13",
				onselect: function () {}
			}]
		},
		ChapterTwo13: {
            choices: [{
				text: "Вибору нема",
				nextpage: "ChapterTwo14_1",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterTwo14_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo15",
				onselect: function () {}
			}]
		},
		ChapterTwo15: {
            choices: [{
				text: "Обіцяти їй що ви встановите справедливість",
				nextpage: "ChapterTwo15_1",
				onselect: function () {
					
				}
                }, {
				text: "Обіцяти їй що ви усунете чаклуна",
				nextpage: "ChapterTwo15_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterTwo15_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree16",
				onselect: function () {}
			}]
		},
		ChapterTwo15_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree16",
				onselect: function () {}
			}]
		},
		ChapterUThree16: {
            choices: [{
				text: "Зробити велику шпигунську сітку",
				nextpage: "ChapterUThree16_1",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
					character.stats.increase(SINS);
				}
                }, {
				text: "Агресивно виявляти чаклунів",
				nextpage: "ChapterUThree16_2",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
				}
                }, {
				text: "Заручитися підтримкою шляхти",
				nextpage: "ChapterUThree16_3",
				onselect: function () {
					character.stats.increaseBy(NOBILITY_APPROVAL, 10);
				}
			}
            ]
		},
		ChapterUThree16_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree17",
				onselect: function () {}
			}]
		},
		ChapterUThree16_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree17",
				onselect: function () {}
			}]
		},
		ChapterUThree16_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree17",
				onselect: function () {}
			}]
		},
		ChapterUThree17: {
            choices: [{
				text: "Придбати трохи за кошти гільдії",
				nextpage: "ChapterUThree17_1",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
				}
                }, {
				text: "Відмовитися",
				nextpage: "ChapterUThree17_2",
				onselect: function () {
					
				}
                }, {
				text: "Придбати за допомогою шляхти",
				nextpage: "ChapterUThree17_3",
				valid: character => character.stats.nobilityapproval > 0,
				onselect: function () {
					character.stats.decreaseBy(NOBILITY_APPROVAL, 10);
					character.stats.increaseBy(HUNT_SKILLS, 20);
				}
			}
            ]
		},
		ChapterUThree17_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree18",
				onselect: function () {}
			}]
		},
		ChapterUThree17_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree18",
				onselect: function () {}
			}]
		},
		ChapterUThree17_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree18",
				onselect: function () {}
			}]
		},
		ChapterUThree18: {
            choices: [{
				text: "Розірвати звя’зок селища з чаклуном, але тоді багато людей помре",
				nextpage: "ChapterUThree18_1",
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
					character.stats.decreaseBy(HUNT_RESOURCES, 20);
				}
                }, {
				text: "Залишити зв’язок селища з чаклуном та спостерігати",
				nextpage: "ChapterUThree18_2",
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
				}
			}
            ]
		},
		ChapterUThree18_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree19",
				onselect: function () {}
			}]
		},
		ChapterUThree18_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree19",
				onselect: function () {}
			}]
		},
		ChapterUThree19: {
            choices: [{
				text: "Підготувати кращих людей задля штурму",
				nextpage: "ChapterUThree19_1",
				valid: character => character.stats.huntskills > 20,
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
                }, {
				text: "Зробити це з довіреними людьми та шаблею",
				nextpage: "ChapterUThree19_2",
				valid: function () {return character.history.backstory4 == 0},
				onselect: function () {
					
				}
				}, {
				text: "Зробити це з довіреними людьми та майстерністю",
				nextpage: "ChapterUThree19_3",
				valid: function () {return character.history.backstory4 == 1},
				onselect: function () {
					
				}
                }, {
				text: "Зробити це з довіреними людьми та святим словом",
				nextpage: "ChapterUThree19_4",
				valid: function () {return character.history.backstory4 == 2},
				onselect: function () {
					
				}
                }, {
				text: "Навалитися гуртома",
				nextpage: "ChapterUThree19_5",
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 20);
				}
                }, {
				text: "Слідкувати",
				nextpage: "ChapterUThree19_6",
				valid: function () {return character.history.ChapterUThree16 == 0;},
				onselect: function () {
					character.stats.increaseBy(HUNT_SKILLS, 10);
				}
                }
            ]
		},
		ChapterUThree19_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree19_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree19_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree19_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree19_5: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree19_6: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree20",
				onselect: function () {}
			}]
		},
		ChapterUThree20: {
            choices: [{
				text: "Погодитись",
				nextpage: "ChapterUThree20_1",
				onselect: function () {
					character.stats.increase(SINS);
				}
                }, {
				text: "Відмовитись",
				nextpage: "ChapterUThree20_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterUThree20_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree21",
				onselect: function () {}
			}]
		},
		ChapterUThree20_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree21",
				onselect: function () {}
			}]
		},
		ChapterUThree21: {
            choices: [{
				text: "Погодитись. Ви зробите це удвох.",
				nextpage: "ChapterUThree21_1",
				onselect: function () {
					character.stats.increase(SINS);
				}
                }, {
				text: "Відмовитись. Прийти з мисливцями.",
				nextpage: "ChapterUThree21_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterUThree21_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree22",
				onselect: function () {}
			}]
		},
		ChapterUThree21_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree22",
				onselect: function () {}
			}]
		},
		ChapterUThree22: {
            choices: [{
				text: "Відправити на діло кращих слідчих",
				nextpage: "ChapterUThree22_1",
				valid: function () {return (character.history.ChapterUThree17 == 0 && character.stats.huntskills > 0) || (character.history.ChapterUThree17 == 2);}, 
				onselect: function () {
					character.stats.decreaseBy(HUNT_RESOURCES, 10);
				}
                }, {
				text: "Відправити суккуба",
				nextpage: "ChapterUThree22_2",
				valid: function () {return (character.history.ChapterUThree20 == 0) && (character.history.ChapterUThree21 == 0);},
				onselect: function () {
					
				}
			}, {
				text: "Ігнорувати",
				nextpage: "ChapterUThree22_2",
				onselect: function () {
					character.stats.increase(SINS);
				}
			}
            ]
		},
		ChapterUThree22_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree23",
				onselect: function () {}
			}]
		},
		ChapterUThree22_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree23",
				onselect: function () {}
			}]
		},
		ChapterUThree22_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterUThree23",
				onselect: function () {}
			}]
		},
		ChapterUThree23: {
            choices: [{
				text: "Підготуватися до суду",
				nextpage: "ChapterUThree23_1",
				onselect: function () {
					
				}
                }, {
				text: "Підготуватися до усунення",
				nextpage: "ChapterUThree23_2",
				onselect: function () {
					
				}
			}, {
				text: "Втікти",
				nextpage: "ChapterUThree23_3",
				valid: function () {return (character.history.ChapterUThree20 == 0) && (character.history.ChapterUThree21 == 0);},
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterUThree23_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne25",
				onselect: function () {}
			}]
		},
		ChapterUThree23_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25",
				onselect: function () {}
			}]
		},
		ChapterUThree23_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourUThree25",
				onselect: function () {}
			}]
		},
		// ______________________________________________________________________________________________________________________________
		ChapterXFourOne25: {
            choices: [{
				text: "Заборонили їй чаклувати",
				nextpage: "ChapterXFourOne25_1",
				valid: function () {return character.history.ChapterOne8 == 0;},
				onselect: function () {
					
				}
                }, {
				text: "Ігнорували",
				nextpage: "ChapterXFourOne25_2",
				valid: function () {return character.history.ChapterOne8 == 1;},
				onselect: function () {
					
				}
				}, {
				text: "Відправили до академії",
				nextpage: "ChapterXFourOne25_3",
				valid: function () {return character.history.ChapterOne8 == 2;},
				onselect: function () {
					
				}
				}, {
				text: "Видали ліцензію",
				nextpage: "ChapterXFourOne25_4",
				valid: function () {return character.history.ChapterOne8 == 3;},
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne25_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne26",
				onselect: function () {}
			}]
		},
		ChapterXFourOne25_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne26",
				onselect: function () {}
			}]
		},
		ChapterXFourOne25_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne26",
				onselect: function () {}
			}]
		},
		ChapterXFourOne25_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne26",
				onselect: function () {}
			}]
		},
		ChapterXFourOne26: {
            choices: [{
				text: "Зв’язками у злочинному світі",
				nextpage: "ChapterXFourOne26_1",
				valid: function () {return character.history.ChapterUThree16 == 0;},
				onselect: function () {
					
				}
                }, {
				text: "Агресивною поведінкою",
				nextpage: "ChapterXFourOne26_2",
				valid: function () {return (character.history.ChapterUThree16 == 1) && character.stats.magictolerance < 0;},
				onselect: function () {
					
				}
				}, {
				text: "Агресивною поведінкою",
				nextpage: "ChapterXFourOne26_3",
				valid: function () {return (character.history.ChapterUThree16 == 1) && character.stats.magictolerance >= 0;},
				onselect: function () {
					character.stats.increase(SINS);
				}
				}, {
				text: "Зв’язками зі шляхтою",
				nextpage: "ChapterXFourOne26_4",
				valid: function () {return character.history.ChapterUThree16 == 2;},
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne26_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne27",
				onselect: function () {}
			}]
		},
		ChapterXFourOne26_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne27",
				onselect: function () {}
			}]
		},
		ChapterXFourOne26_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne27",
				onselect: function () {}
			}]
		},
		ChapterXFourOne26_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne27",
				onselect: function () {}
			}]
		},
		ChapterXFourOne27: {
            choices: [{
				text: "Так",
				nextpage: "ChapterXFourOne27_1",
				valid: function () {return (character.history.ChapterUThree20 == 0) || (character.history.ChapterUThree21 == 0);},
				onselect: function () {
					
				}
                }, {
				text: "Ні",
				nextpage: "ChapterXFourOne27_2",
				valid: function () {return (character.history.ChapterUThree20 == 1) && (character.history.ChapterUThree21 == 1);},
				onselect: function () {
					
				}
			}, {
				text: "Трохи",
				nextpage: "ChapterXFourOne27_3",
				valid: function () {return ((character.history.ChapterUThree20 == 0) || (character.history.ChapterUThree21 == 0)) && (character.stats.charisma >= 4);},
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne27_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne28",
				onselect: function () {}
			}]
		},
		ChapterXFourOne27_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne28",
				onselect: function () {}
			}]
		},
		ChapterXFourOne27_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne28",
				onselect: function () {}
			}]
		},
		ChapterXFourOne28: {
            choices: [{
				text: "Так, ваші люди викрили головного чаклуна",
				nextpage: "ChapterXFourOne28_1",
				valid: function () {return character.history.ChapterUThree22 == 0},
				onselect: function () {
					
				}
                }, {
				text: "Так, ваш 'довірений агент' викрив чаклуна",
				nextpage: "ChapterXFourOne28_2",
				valid: function () {return character.history.ChapterUThree22 == 1},
				onselect: function () {
					
				}
				}, {
				text: "Вам не вдалося це з'ясувати",
				nextpage: "ChapterXFourOne28_3",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne28_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne29",
				onselect: function () {}
			}]
		},
		ChapterXFourOne28_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne29",
				onselect: function () {}
			}]
		},
		ChapterXFourOne28_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne29",
				onselect: function () {}
			}]
		},
		ChapterXFourOne29: {
            choices: [{
				text: "Впевнити усіх присутніх у своїх добрих намірах",
				nextpage: "ChapterXFourOne29_1",
				valid: character.stats.charisma > 4,
				onselect: function () {
					character.stats.decrease(SINS);
				}
                }, {
				text: "Ні, ви не знаходите слів",
				nextpage: "ChapterXFourOne29_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne29_1: {
            choices: [{
				text: "До результату суду(Успішний суд)",
				nextpage: "ChapterXFourOne30",
				valid: character.stats.sins <= 2,
				onselect: function () {
					
				}
                }, {
				text: "До результату суду(Ув'язнення)",
				nextpage: "ChapterXFourOne31",
				valid: character.stats.sins > 2,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne29_2: {
            choices: [{
				text: "До результату суду(Успішний суд)",
				nextpage: "ChapterXFourOne30",
				valid: character.stats.sins <= 2,
				onselect: function () {
					
				}
                }, {
				text: "До результату суду(Ув'язнення)",
				nextpage: "ChapterXFourOne31",
				valid: character.stats.sins > 2,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne30: {
            choices: [{
				text: "До питання чаклунів(Терпимість)",
				nextpage: "ChapterXFourOne32",
				valid: character.stats.magictolerance > 0,
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }, {
				text: "До питання чаклунів(Гоніння)",
				nextpage: "ChapterXFourOne33",
				valid: character.stats.magictolerance < 0,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne31: {
            choices: [{
				text: "До питання чаклунів(Терпимість)",
				nextpage: "ChapterXFourOne32",
				valid: character.stats.magictolerance > 0,
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }, {
				text: "До питання чаклунів(Гоніння)",
				nextpage: "ChapterXFourOne33",
				valid: character.stats.magictolerance < 0,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne32: {
            choices: [{
				text: "До долі мисливців(Стражі закону)",
				nextpage: "ChapterXFourOne34",
				valid: character.stats.decaypoints <= 1,
				onselect: function () {
					
				}
                }, {
				text: "До долі мисливців(Розпад)",
				nextpage: "ChapterXFourOne35",
				valid: character.stats.decaypoints >= 2,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne33: {
            choices: [{
				text: "До долі мисливців(Палачі)",
				nextpage: "ChapterXFourOne36",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne34: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourOne35: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourOne36: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		//______________________________________________________________________________________________________________________________
		ChapterXFourTwo25: {
            choices: [{
				text: "Так, ви купували артефакти зі сходу",
				nextpage: "ChapterXFourTwo25_1",
				valid: function () {return character.history.ChapterUThree17 == 2},
				onselect: function () {
					
				}
                }, {
				text: "Ви будете шукати інший план",
				nextpage: "ChapterXFourTwo25_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourTwo25_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25_3_0",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo26",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_3_0: {
            choices: [{
				text: "Зробити відчайдушний випад",
				nextpage: "ChapterXFourTwo25_3_1",
				valid: character => (character.stats.fencing) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
                }, {
				text: "Зробити відчайдушний прийом",
				nextpage: "ChapterXFourTwo25_3_2",
				valid: character => (character.stats.martialarts) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
				}, {
				text: "Промовити відчайдушну молитву",
				nextpage: "ChapterXFourTwo25_3_3",
				valid: character => (character.stats.holymagic) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
				}, {
				text: "У вас немає ничого окрім відчаю",
				nextpage: "ChapterXFourTwo25_3_4",
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourTwo25_3_1: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_3_2: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_3_3: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_3_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26: {
            choices: [{
				text: "Так, ви робили агресивну агентурну працю",
				nextpage: "ChapterXFourTwo26_1",
				valid: function () {return character.history.ChapterUThree16 == 0},
				onselect: function () {
					
				}
                }, {
				text: "Ви будете шукати інший план",
				nextpage: "ChapterXFourTwo26_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourTwo26_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo26_3_0",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo26",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26_3_0: {
            choices: [{
				text: "Зробити відчайдушний випад",
				nextpage: "ChapterXFourTwo26_3_1",
			valid: character => (character.stats.fencing) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
                }, {
				text: "Зробити відчайдушний прийом",
				nextpage: "ChapterXFourTwo26_3_2",
				valid: character => (character.stats.martialarts) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
				}, {
				text: "Промовити відчайдушну молитву",
				nextpage: "ChapterXFourTwo26_3_3",
				valid: character => (character.stats.holymagic) && (character.stats.huntskills >= 30),
				onselect: function () {
					
				}
				}, {
				text: "У вас немає ничого окрім відчаю",
				nextpage: "ChapterXFourTwo26_3_4",
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourTwo26_3_1: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26_3_2: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26_3_3: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo26_3_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo27: {
            choices: [{
				text: "Це ваш единий шанс",
				nextpage: "ChapterXFourTwo27_1",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourTwo27_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo27_3_0",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo27_3_0: {
            choices: [{
				text: "Зробити відчайдушний випад",
				nextpage: "ChapterXFourTwo27_3_1",
				valid: character => (character.stats.fencing) && (character.stats.huntskills >= 40),
				onselect: function () {
					
				}
                }, {
				text: "Зробити відчайдушний прийом",
				nextpage: "ChapterXFourTwo27_3_2",
				valid: character => (character.stats.martialarts) && (character.stats.huntskills >= 40),
				onselect: function () {
					
				}
				}, {
				text: "Промовити відчайдушну молитву",
				nextpage: "ChapterXFourTwo27_3_3",
				valid: character => (character.stats.holymagic) && (character.stats.huntskills >= 40),
				onselect: function () {
					
				}
				}, {
				text: "У вас немає ничого окрім відчаю",
				nextpage: "ChapterXFourTwo27_3_4",
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourTwo27_3_1: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo27_3_2: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo27_3_3: {
			choices: [{
				text: "До долі мисливців(Залізна рука)",
				nextpage: "ChapterXFourTwo25_4",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo27_3_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		//______________________________________________________________________________________________________________________________
		ChapterXFourUThree25: {
            choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourUThree25_1",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourUThree25_1: {
            choices: [{
				text: "До питання чаклунів(Терпимість)",
				nextpage: "ChapterXFourUThree26",
				valid: character => character.stats.magictolerance > 0,
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }, {
				text: "До питання чаклунів(Гоніння)",
				nextpage: "ChapterXFourUThree27",
				valid: character => character.stats.magictolerance < 0,
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
			}
            ]
		},
		ChapterXFourUThree26: {
            choices: [{
				text: "До долі мисливців(Стражі закону)",
				nextpage: "ChapterXFourUThree28",
				valid: character => character.stats.decaypoints == 0,
				onselect: function () {
					
				}
                }, {
				text: "До долі мисливців(Розпад)",
				nextpage: "ChapterXFourUThree29",
				valid: character => character.stats.decaypoints >= 1,
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourUThree27: {
            choices: [{
				text: "До долі мисливців(Палачі)",
				nextpage: "ChapterXFourUThree30",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourUThree28: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourUThree29: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourUThree30: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
	}
};