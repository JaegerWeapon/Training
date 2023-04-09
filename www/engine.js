var engine = {
    goToPage: function (pagename) {
		if (!story.pages.hasOwnProperty(pagename)){
			alert("Сторінка ще не написана");
			return;
		}
		
		character.stats.currentPage = pagename;
		
		document.getElementById("art").style.display = "";
		document.getElementById("art").setAttribute("xlink:href", "images/" + pagename + ".jpg");
				
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
		playSound("sounds/page-flip-" + Math.floor(Math.random() * 7) + ".mp3")
	}
}

var showone = document.getElementsByClassName("hidden1");
var showtwo = document.getElementsByClassName("hidden2");
var showthree = document.getElementsByClassName("hidden3");
var showfour = document.getElementsByClassName("hidden4");

function myLoad() {
	if (localStorage.getItem("showone") !== null) {
	for(var i = 0; i < showone.length; i++)
						{
    					showone[i].classList.add('visible');
						}
						}
	if (localStorage.getItem("showtwo") !== null) {
	for(var i = 0; i < showtwo.length; i++)
						{
    					showtwo[i].classList.add('visible');
						}
						}
	if (localStorage.getItem("showthree") !== null) {
	for(var i = 0; i < showthree.length; i++)
						{
    					showthree[i].classList.add('visible');
						}
						}
	if (localStorage.getItem("showfour") !== null) {
	for(var i = 0; i < showfour.length; i++)
						{
    					showfour[i].classList.add('visible');
						}
						}
}

window.addEventListener("load", myLoad);

function playSound(url) {
	const audio = new Audio(url);
	audio.play();
}


var save = function() {
	localStorage.clear();
	localStorage.setItem('history', JSON.stringify(character.history));
	
	localStorage.setItem('stats', JSON.stringify(character.stats));
	
	localStorage.setItem('showone', JSON.stringify(showone));
	localStorage.setItem('showtwo', JSON.stringify(showtwo));
	localStorage.setItem('showthree', JSON.stringify(showthree));
	localStorage.setItem('showfour', JSON.stringify(showfour));
	
	playSound("sounds/bell.mp3");
	};

var load = function() {
	if (localStorage.getItem('stats') === null) {
		engine.goToPage("backstory0");
		welcomesign.open();
		return false;
	}
	
	var loadedStats = JSON.parse(localStorage.getItem("stats"));
	Object.assign(character.stats, loadedStats);
	engine.goToPage(character.stats.currentPage);
	character.history = JSON.parse(localStorage.getItem("history"));
	return true;
}

function resetHistory() {
	localStorage.removeItem("history");
	character.history = {};
	}

function restart() {
		character.stats.resetStats(defaults);
		resetHistory();
		save();
		//character.stats.currentPage = "backstory0";
		engine.goToPage("backstory0");
}

var welcomesign = {
	open: function() {document.getElementById("welcome_container").classList.add("visible");},
	close: function() {document.getElementById("welcome_container").classList.remove("visible");}
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
var CURRENT_PAGE = "currentPage";

var statNames = [STRENGTH, REFLEXES, INTELLIGENCE, CHARISMA, FENCING, MARTIALARTS, HOLYMAGIC, HUNT_RESOURCES, HUNT_SKILLS, MAGIC_TOLERANCE, NOBILITY_APPROVAL, SINS, DECAY_POINTS, CURRENT_PAGE];

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
	decaypoints: 0,
	currentPage: "backstory0"
};

var character = {
	
	history: {},
	
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
		currentPage: "",
		
		refresh: function() {
			statNames.forEach(name => {
				var element = document.getElementById(name + "Stat");
				if (element) {element.innerText = this[name];}
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
					
					for(var i = 0; i < showone.length; i++)
						{
    					showone[i].classList.add('visible');
						}
				}
                }, {
				text: "Хитрого пройдисвіта",
				nextpage: "backstory1_2",
				onselect: function () {
					character.stats.resetStats({reflexes: 1});
					
					for(var i = 0; i < showone.length; i++)
						{
    					showone[i].classList.add('visible');
						}
				}
                }, {
				text: "Мудру босорку",
				nextpage: "backstory1_3",
				onselect: function () {
				character.stats.resetStats({intelligence: 1});
					
					for(var i = 0; i < showone.length; i++)
						{
    					showone[i].classList.add('visible');
						}
				}
                }, {
				text: "Сліпого кобзаря",
				nextpage: "backstory1_4",
				onselect: function () {
					character.stats.resetStats({charisma: 1});
					
					for(var i = 0; i < showone.length; i++)
						{
    					showone[i].classList.add('visible');
						}
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
						for(var i = 0; i < showtwo.length; i++)
						{
    					showtwo[i].classList.add('visible');
						}
				}
                }, {
				text: "Мистецтву бою",
				nextpage: "backstory4_2",
				onselect: function () {
					character.stats.skillOn(MARTIALARTS);
					for(var i = 0; i < showtwo.length; i++)
						{
    					showtwo[i].classList.add('visible');
						}
				}
                }, {
				text: "Святому писанню",
				nextpage: "backstory4_3",
				onselect: function () {
					character.stats.skillOn(HOLYMAGIC);
					for(var i = 0; i < showtwo.length; i++)
						{
    					showtwo[i].classList.add('visible');
						}
				}
                }, {
				text: "Красному слову",
				nextpage: "backstory4_4",
				onselect: function () {
					character.stats.increaseBy(CHARISMA, 2);
					for(var i = 0; i < showtwo.length; i++)
						{
    					showtwo[i].classList.add('visible');
						}
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
					
						for(var i = 0; i < showthree.length; i++)
						{
    					showthree[i].classList.add('visible');
						}
				}
                }, {
				text: "Тримати деякий час під арештом",
				nextpage: "ChapterOne6_2",
				onselect: function () {
					character.stats.increaseBy(MAGIC_TOLERANCE, 10);
					character.stats.decreaseBy(NOBILITY_APPROVAL, 10);
					
						for(var i = 0; i < showthree.length; i++)
						{
    					showthree[i].classList.add('visible');
						}	
				}
                }, {
				text: "Відпустити",
				nextpage: "ChapterOne6_3",
				onselect: function () {
					character.stats.decreaseBy(MAGIC_TOLERANCE, 10);
					
						for(var i = 0; i < showthree.length; i++)
						{
    					showthree[i].classList.add('visible');
						}
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
				nextpage: "ChapterTwo14",
				onselect: function () {}
			}]
		},
		ChapterTwo13_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo14",
				onselect: function () {}
			}]
		},
		ChapterTwo13_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterTwo14",
				onselect: function () {}
			}]
		},
		ChapterTwo14: {
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
				text: "Ви будете просити допомоги у шляхти",
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
				nextpage: "ChapterXFourOne24",
				onselect: function () {
					for(var i = 0; i < showfour.length; i++)
						{
    					showfour[i].classList.add('visible');
						}
				}
			}]
		},
		ChapterUThree23_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo24",
				onselect: function () {
					for(var i = 0; i < showfour.length; i++)
						{
    					showfour[i].classList.add('visible');
						}
				}
			}]
		},
		ChapterUThree23_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourUThree24",
				onselect: function () {
					for(var i = 0; i < showfour.length; i++)
						{
    					showfour[i].classList.add('visible');
						}
				}
			}]
		},
		// ______________________________________________________________________________________________________________________________
		ChapterXFourOne24: {
            choices: [{
				text: "Заборонили їй чаклувати",
				nextpage: "ChapterXFourOne24_1",
				valid: function () {return character.history.ChapterOne8 == 0;},
				onselect: function () {
					
				}
                }, {
				text: "Ігнорували",
				nextpage: "ChapterXFourOne24_2",
				valid: function () {return character.history.ChapterOne8 == 1;},
				onselect: function () {
					
				}
				}, {
				text: "Відправили до академії",
				nextpage: "ChapterXFourOne24_3",
				valid: function () {return character.history.ChapterOne8 == 2;},
				onselect: function () {
					
				}
				}, {
				text: "Видали ліцензію",
				nextpage: "ChapterXFourOne24_4",
				valid: function () {return character.history.ChapterOne8 == 3;},
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne24_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne25",
				onselect: function () {}
			}]
		},
		ChapterXFourOne24_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne25",
				onselect: function () {}
			}]
		},
		ChapterXFourOne24_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne25",
				onselect: function () {}
			}]
		},
		ChapterXFourOne24_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne25",
				onselect: function () {}
			}]
		},
		ChapterXFourOne25: {
            choices: [{
				text: "Зв’язками у злочинному світі",
				nextpage: "ChapterXFourOne25_1",
				valid: function () {return character.history.ChapterUThree16 == 0;},
				onselect: function () {
					
				}
                }, {
				text: "Ви розширювалися цілком за законом",
				nextpage: "ChapterXFourOne25_2",
				valid: function () {return character.history.ChapterUThree16 == 1;},
				onselect: function () {
					
				}
				}, {
				text: "Зв’язками зі шляхтою",
				nextpage: "ChapterXFourOne25_3",
				valid: function () {return character.history.ChapterUThree16 == 2;},
				onselect: function () {
					character.stats.increase(SINS);
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
		ChapterXFourOne26: {
            choices: [{
				text: "Ви також співпрацювали з демонами",
				nextpage: "ChapterXFourOne26_1",
				valid: function () {return (character.history.ChapterUThree20 == 0) || (character.history.ChapterUThree21 == 0);},
				onselect: function () {
					
				}
                }, {
				text: "Ви ніколи не співпрацювали з демонами.",
				nextpage: "ChapterXFourOne26_2",
				valid: function () {return (character.history.ChapterUThree20 == 1) && (character.history.ChapterUThree21 == 1);},
				onselect: function () {
					
				}
			}, {
				text: "Ви співпрацювали з демонами, але у благо закону",
				nextpage: "ChapterXFourOne26_3",
				valid: function () {return ((character.history.ChapterUThree20 == 0) || (character.history.ChapterUThree21 == 0)) && (character.stats.charisma >= 4);},
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
		ChapterXFourOne27: {
            choices: [{
				text: "Ви хотіли покращити ставлення до магії у суспільстві",
				nextpage: "ChapterXFourOne27_1",
				onselect: function () {
					
				}
                }, {
				text: "Ви хотіли заборонити магію",
				nextpage: "ChapterXFourOne27_2",
				onselect: function () {
					
				}
				}, {
				text: "Вас завжди вело відчуття справедливості",
				nextpage: "ChapterXFourOne27_3",
				onselect: function () {
					
				}
			}, {
				text: "Ви лише виконували волю своєї королеви",
				nextpage: "ChapterXFourOne27_4",
				onselect: function () {
					
				}
			}, {
				text: "Ви хотіли влади та визнання",
				nextpage: "ChapterXFourOne27_5",
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
		ChapterXFourOne27_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne28",
				onselect: function () {}
			}]
		},
		ChapterXFourOne27_5: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourOne28",
				onselect: function () {}
			}]
		},
		ChapterXFourOne28: {
            choices: [{
				text: "Так. Ви знаєте що потрібно говорити щоб захистити себе",
				nextpage: "ChapterXFourOne28_1",
				valid: character => character.stats.charisma > 4,
				onselect: function () {
					character.stats.decrease(SINS);
				}
                }, {
				text: "Ні, вам нічого додати",
				nextpage: "ChapterXFourOne28_2",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne28_1: {
            choices: [{
				text: "До результату суду(Бездоганний суд)",
				nextpage: "ChapterXFourOne29",
				valid: character => character.stats.sins == 0,
				onselect: function () {
					
				}
                }, {
				text: "До результату суду(Успішний суд)",
				nextpage: "ChapterXFourOne30",
				valid: character => character.stats.sins <= 2,
				onselect: function () {
					
				}
				}, {
				text: "До результату суду(Провальний суд)",
				nextpage: "ChapterXFourOne31",
				valid:character =>  character.stats.sins > 2,
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne28_2: {
            choices: [{
				text: "До результату суду(Бездоганний суд)",
				nextpage: "ChapterXFourOne29",
				valid: character => character.stats.sins == 0,
				onselect: function () {
					
				}
                }, {
				text: "До результату суду(Успішний суд)",
				nextpage: "ChapterXFourOne30",
				valid: character => character.stats.sins <= 2,
				onselect: function () {
					
				}
				}, {
				text: "До результату суду(Провальний суд)",
				nextpage: "ChapterXFourOne31",
				valid: character => character.stats.sins > 2,
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne29: {
            choices: [{
				text: "До питання чаклунів",
				nextpage: "ChapterXFourOne32",
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }
            ]
		},
		ChapterXFourOne30: {
            choices: [{
				text: "До питання чаклунів",
				nextpage: "ChapterXFourOne32",
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }
            ]
		},
		ChapterXFourOne31: {
            choices: [{
				text: "До питання чаклунів",
				nextpage: "ChapterXFourOne32",
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
                }
            ]
		},
		ChapterXFourOne32: {
            choices: [{
				text: "До долі мисливців",
				nextpage: "ChapterXFourOne33",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourOne33: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				valid: function () {return !((character.history.ChapterUThree20 == 0) && (character.history.ChapterUThree21 == 0) && (character.history.ChapterXFourOne30 == 0));},
				onselect: function () {}
			}, {
				text: "Продовжити(Як бути з Кліо)",
				valid: function () {return (character.history.ChapterUThree20 == 0) && (character.history.ChapterUThree21 == 0) && (character.history.ChapterXFourOne30 == 0);},
				nextpage: "ChapterXFourOne34",
				onselect: function () {}
			}]
		},
		ChapterXFourOne34: {
            choices: [{
				text: "Ви будите разом попри все",
				nextpage: "ChapterXFourOne34_1",
				onselect: function () {
					
				}
				}, {
				text: "Ви не можете бути разом",
				nextpage: "ChapterXFourOne34_2",
				onselect: function () {
					
				}
				}
            ]
		},
		ChapterXFourOne34_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourOne34_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		//______________________________________________________________________________________________________________________________
		ChapterXFourTwo24: {
            choices: [{
				text: "Ви кидаєтесь на ворога з шаблею",
				nextpage: "ChapterXFourTwo24_1",
				valid: function () {return character.history.backstory4 == 0},
				onselect: function () {
					
				}
                }, {
				text: "Ви кидаєтесь на ворога з палицею",
				nextpage: "ChapterXFourTwo24_2",
				valid: function () {return character.history.backstory4 == 1},
				onselect: function () {
					
				}
			}, {
				text: "Ви сліпете ворога святим сяйвом",
				nextpage: "ChapterXFourTwo24_3",
				valid: function () {return character.history.backstory4 == 2},
				onselect: function () {
					
				}
                }, {
				text: "Ви не можете нічого зробити",
				nextpage: "ChapterXFourTwo24_4",
				onselect: function () {
					
				}
			}
            ]
		},
		ChapterXFourTwo24_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_4: {
			choices: [{
				text: "То це був не філактерій…",
				nextpage: "ChapterXFourTwo24_4_1",
				onselect: function () {}
			}, {
				text: "Вітаю… Ти все ж переміг…",
				nextpage: "ChapterXFourTwo24_4_2",
				onselect: function () {}
			}, {
				text: "Змилуйся над рештою мисливців… Вони не причетні…",
				nextpage: "ChapterXFourTwo24_4_3",
				onselect: function () {}
			}, {
				text: "Помилуй, будь ласка…",
				nextpage: "ChapterXFourTwo24_4_4",
				onselect: function () {}
			}, {
				text: "Горіти тобі у пеклі…",
				nextpage: "ChapterXFourTwo24_4_5",
				onselect: function () {}
			},]
		},
		ChapterXFourTwo24_4_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_4_2: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_4_3: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_4_4: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo24_4_5: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25: {
           choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourTwo25_1",
				onselect: function () {}
			}]
		},
		ChapterXFourTwo25_1: {
			choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
		//______________________________________________________________________________________________________________________________
		ChapterXFourUThree24: {
            choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourUThree25",
				onselect: function () {
					if (character.stats.huntresources < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.huntskills < 0) {character.stats.increase(DECAY_POINTS)}
					if (character.stats.nobilityapproval < 0) {character.stats.increase(DECAY_POINTS)}
				}
			}
            ]
		},
		ChapterXFourUThree25: {
            choices: [{
				text: "Продовжити",
				nextpage: "ChapterXFourUThree26",
				onselect: function () {
					
				}
                }
            ]
		},
		ChapterXFourUThree26: {
            choices: [{
				text: "Продовжити",
				nextpage: "The_End_100",
				onselect: function () {
					
				}
                }
            ]
		},
		The_End_100: {
			choices: [{
				text: "Продовжити",
				valid: character => character.stats.decaypoints > 100,
				nextpage: "The_End_100",
				onselect: function () {}
			}]
		},
	}
};