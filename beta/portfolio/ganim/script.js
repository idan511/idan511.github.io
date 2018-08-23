var page = 1;
function d(name) {return document.getElementById(name);}
/*
function openMail() {
	d("antimail").style.display = "table-cell";
	d('fb').style.display='none';
	d('parent').style.display='none';
	d('cal').style.display='none';
	d('mail').style.display='none';
}
function closeMail() {
	d("antimail").style.display = "none";
	d('fb').style.display='table-cell';
	d('parent').style.display='table-cell';
	d('cal').style.display='table-cell';
	d('mail').style.display='table-cell';
}*/
function swipe() {
	if(page==1) {
		d("liltable").style.right = "-100%";
		d("swiper").style.right = "0%";
		page = 2;
	} else {
		d("liltable").style.right = "0%";
		d("swiper").style.right = "90%";
		page = 1;
	}
}/*åå
function load() {
	setTimeout(function(){
		d("fb").style.webkitAnimation = "none";
		d("fb").style.webkitFilter = "opacity(1)";
		d("parent").style.webkitAnimation = "none";
		d("parent").style.webkitFilter = "opacity(1)";
		d("cal").style.webkitAnimation = "none";
		d("cal").style.webkitFilter = "opacity(1)";
		d("mail").style.webkitAnimation = "none";
		d("mail").style.webkitFilter = "opacity(1)";
	},1000)
}
function openForum() {
	d("forumgay").style.top = "0px";
	d("tabclose").style.bottom = "0px";
}
function openBig() {
	d("biggay").style.top = "0px";
	d("tabclose").style.bottom = "0px";
}
function openLil() {
	d("lilgay").style.top = "0px";
	d("tabclose").style.bottom = "0px";
}
function openInsta() {
	d("instagay").style.top = "0px";
	d("tabclose").style.bottom = "0px";
}
function closetabs() {
	d("tabclose").style.bottom = "-5%";
	d("biggay").style.top = "-100%";
	d("lilgay").style.top = "-100%";
	d("forumgay").style.top = "-100%";
	d("instagay").style.top = "-100%";
}*/
Hammer(d("body")).on("swipeleft", function() {
    alert('you swiped left!');
});