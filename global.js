if (localStorage.getItem("themeColour") == undefined) {
	localStorage.setItem("themeColour", "#1e88e5");
	localStorage.setItem("backgroundImage", "7");
	localStorage.setItem("theme", "colourful");
	localStorage.setItem("navbar", "mobile");
	localStorage.setItem("secondColour", "#ff9800");
};

mobileIndicator();
document.getElementById('menuTitle').innerHTML = page();

$( document ).ready(function() {
	loadPageContent();
});

document.body.style.backgroundImage = localStorage.getItem('backgroundImage');
document.documentElement.style.setProperty('--mdc-theme-primary', localStorage.getItem('themeColour'));
document.documentElement.style.setProperty('--mdc-theme-secondary',  localStorage.getItem('secondColour'));
var menu = false;
var online = navigator.onLine;
// send user to setup?
if (localStorage.getItem("user") == undefined && page() != 'setup') {
	console.log("User visiting for the first time! Activating new user popup...");
	//setPage('/setup');
};

$('head').append('<meta name="theme-color" content="' + localStorage.getItem("themeColour") + '" />');

// Calculate Cards
function calculateCardColumns() {
	if (localStorage.getItem("theme") != "v0.8a" && localStorage.getItem("theme") != "v1.0b") {
		if (screen.width > "1024") {
			cardsDesktop();
			var layout = "desktop";
		} else if (screen.width > "767") {
			cardsTablet();
			var layout = "tablet";
		}	else if (screen.width > screen.height) {
			cardsTablet();
			var layout = "tablet";
		} else {
			cardsPhone();
			var layout = "phone";
		};
	};
}

function cardsDesktop() {
	console.log("desktop");
	cardColumns(3);
};
function cardsTablet() {
	console.log("tablet");
	cardColumns(2);
};
function cardsPhone() {
	console.log("phone");
	cardColumns(1);
};
function cardColumns(colCount) {
	console.log(colCount);
	var type = 1;
	if ($(".pinned").length == "0") {
		while (type < colCount+1) {
			$('.content').append('<div id="column' + type + '" class="column"></div>');
			console.log(type)
			type += 1;
		};
		var type = 1;
		var cardVal = 0;
		while (cardVal < $( ".card" ).length) {
			console.log('Card: ' + cardVal + ' type: ' + type);
			document.getElementsByClassName('card')[0].style.width = '100%';
			document.getElementById('column' + type).appendChild(document.getElementsByClassName('card')[0]);
			
			if (type > colCount-1) {
				type = 1;
			} else {
				type += 1;
			};
			cardVal += 1;
		};
	} else {
		var pinNum = 1;
		var type = 1;
		while (pinNum < $(".pinnedDiv").length+1) {
			while (type < colCount+1) {
				$('#pinned' + pinNum).append('<div id="column' + type + '-' + pinNum + '" class="column"></div>');
				console.log(type + "-" + pinNum);
				type += 1;
			};
			pinNum += 1;
			type = 1;
		}
		var pinNum = 1;
		while (pinNum < $( ".pinned" ).length+2) {
			var cardVal = 0;
			var type = 1;
			while (cardVal < $(".card" + pinNum).length) {
				document.getElementsByClassName('card' + pinNum)[0].style.width = '100%';
				document.getElementById('column' + type + '-' + pinNum).appendChild(document.getElementsByClassName('card' + pinNum)[0]);
				if (type > colCount-1) {
					type = 1;
				} else {
					type += 1;
				};
				cardVal += 1;
			};
			pinNum += 1;
		};
	};
};
// Theme Stuff
function loadTheme() {	
	console.log('themes being loaded');
	if (localStorage.getItem('theme') == 'dark') {
		document.body.className = 'mdc-theme--dark';
		document.body.style.backgroundColor = '#222';
		$('.mdc-card').css('background-color', '#282828');
		$('p').css('color', 'white');
		$('h1').css('color', 'white');
		$('h2').css('color', 'white');
		$('h3').css('color', 'white');
		$('.material-icons').css('color', 'white');
		$('#newsStoryContainer').css('background-color', '#282828');
		$('#shadePage').css('background-color', 'rgba(0, 0, 0, 0.25)');
	} else if (localStorage.getItem('theme') == 'light') {
		$('header').css('background-color', '#fafafa');
		$('#menuTitle').css('color', '#222');
		$('.mdc-tab__icon').css('color', '#222');
		$('.mdc-tab-bar__indicator').css('visibility', 'hidden');
		$('#moreButtonNav').css('color', '#222');
	};
	
};
// Global Functions

function setPage(newLocation) {
	if (page() == 'videos') {
		var popoutVideoId = getParameterByName('video');
		$('#videoPlayer').appendTo('#popoutVideo');
		document.getElementById('videoPlayer').id = 'videoPlayerPopout';
		document.getElementById('videoPlayerPopout').height = "100%";
		var popoutVideo = true;
		document.getElementById('popoutVideo').className = 'open';
	}
	window.history.pushState("setPageFunction", "James M", newLocation);
	mobileIndicator();
	document.getElementById('menuTitle').innerHTML = page();
	loadPageContent();
}

var selLink = 0;
while (selLink < document.getElementsByClassName('link').length) {
	document.getElementsByClassName('link')[selLink].addEventListener('click', function() {
		event.preventDefault();_href = $(this).attr("href");setPage(_href);
	});
	selLink += 1;
};

function closePopoutVideo() {
	$('#videoPlayerPopout').remove();
	document.getElementById('popoutVideo').className = 'close';
	var popoutVideo = true;
}
function fullVideoPlayer() {
	setPage('/videos/?video=' + popoutVideoId);
	closePopoutVideo();
}

// Colour Corrections at the end
$('.info').css('color', localStorage.getItem("themeColour"));
$('.info').children().css('color', localStorage.getItem("themeColour"));
$(".pinned").css("color", localStorage.getItem("themeColour"));

//other stuff

function calculateLayout() {
	if (screen.width > "1024") {
		return "desktop";
	} else if (screen.width > "767") {
		return "tablet";
	}	else if (screen.width > screen.height) {
		return "tablet";
	} else {
		return "phone";
	};
}


function mobileIndicator() {
	$(".mdc-tab--active").removeClass("mdc-tab--active");
	if (page() == 'javascript' || page() == 'code' || page() == 'JQuery' || page() == 'html5') {
		document.getElementsByClassName('mdc-tab')[1].className += ' mdc-tab--active';
	} else if (page() == 'media' || page() == 'videos') {
		document.getElementsByClassName('mdc-tab')[2].className += ' mdc-tab--active';
	} else {
		document.getElementsByClassName('mdc-tab')[0].className += ' mdc-tab--active';
	}
};

function loadPageContent() {
	if (navigator.onLine) {
		if (page() == '') {
			jQuery.get('page/James M.html', function(data) {
				document.getElementsByClassName('content')[0].innerHTML = data;
				loadTheme();
				$.getScript( '/page/James M.js' );
				calculateCardColumns();
				$(".pinned").css("color", localStorage.getItem("themeColour"));
				document.getElementById('menuTitle').innerHTML = 'James M';
				var selLink = 0;
				while (selLink < document.getElementsByClassName('link').length) {
					document.getElementsByClassName('link')[selLink].addEventListener('click', function() {
						event.preventDefault();_href = $(this).attr("href");setPage(_href);
					});
					selLink += 1;
				};
			});
		} else {
			jQuery.get('page/' + page() + '.html', function(data) {
				document.getElementsByClassName('content')[0].innerHTML = data;
				loadTheme();
				$(".pinned").css("color", localStorage.getItem("themeColour"));
				$.getScript( '/page/' + page() + '.js' );
				calculateCardColumns();
				$(".pinned").css("color", localStorage.getItem("themeColour"));
				var selLink = 0;
				while (selLink < document.getElementsByClassName('link').length) {
					document.getElementsByClassName('link')[selLink].addEventListener('click', function() {
						event.preventDefault();_href = $(this).attr("href");setPage(_href);
					});
					selLink += 1;
				};
			});
		}	
	} else {
		jQuery.get('page/offline.html', function(data) {
			document.getElementsByClassName('content')[0].innerHTML = data;
			loadTheme();
			document.getElementById('menuTitle').innerHTML = 'Offline';
			var selLink = 0;
			while (selLink < document.getElementsByClassName('link').length) {
				document.getElementsByClassName('link')[selLink].addEventListener('click', function() {
					event.preventDefault();_href = $(this).attr("href");setPage(_href);
				});
				selLink += 1;
			};
		});
	}
};

function toggleSection(section) {
	if (document.getElementById(section).style.display == 'none') {
		document.getElementById(section).style.display = 'initial';
		document.getElementById('icon-' + section).innerHTML = "<i class='material-icons'>keyboard_arrow_up</i>";
	} else {
		document.getElementById(section).style.display = 'none';
		document.getElementById('icon-' + section).innerHTML = "<i class='material-icons'>keyboard_arrow_down</i>";
	}
}

function shareMenu() {
	if (navigator.share) {
	  navigator.share({
		  text: 'Check out this really cool site:',
		  url: window.location.href,
	  })
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
	}
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function page() {
	return window.location.pathname.slice(1, window.location.pathname.length).replace('/', '')
}

document.oncontextmenu = function() {
	return false;
};
// Popout Video Stuff
var popoutVideo = false;
var popoutVideoId = '00000000000';

// Popstate stuff
window.onpopstate = function(event) {
	mobileIndicator();
	document.getElementById('menuTitle').innerHTML = page();
	loadPageContent();
};