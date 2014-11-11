// JavaScript Document

document.addEventListener("deviceready", onDeviceReady, false);
var db;

function onDeviceReady() {
	db = window.openDatabase("itbina", "1.0", "ITB Notify App", 2*1024*1024);
	db.transaction(createDB, errorDB, successDB);
}

function createDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS POST');
	tx.executeSql('CREATE TABLE IF NOT EXISTS POST (title, content)');	
}

function errorDB(err) {
	alert("Error processing SQL: " + err.code);
}

function successDB() {
	alert("SUCCESS!");
}

function insertDB(tx) {
	var title = $('[name="title"]').val();
	var content = $('[name="content"]').val();
	var sql = 'INSERT INTO POST (title, content) VALUES (?, ?)';
	tx.executeSql(sql, [title, content], queryDB, errorDB);
}

function queryDB(tx) {
	tx.executeSql('SELECT title FROM POST', [], list, errorDB);
}

function list(tx, result) {
	var string = '';
	var len = result.rows.length;
	
	for(var i=0;  i<len; i++) {
		string += '<li>' + result.rows.item(i).title + '<br>' + result.rows.item(i).content + '</li>';
	}
	
	$('#list').html(string);
	$('#list').listview('refresh');
}

function submitForm() {
	db.transaction(insertDB, errorDB);
	$.mobile.changePage("news.html", { reverse: false, transition: "slidedown"});
	return false;
}