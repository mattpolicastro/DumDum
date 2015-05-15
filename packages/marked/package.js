Package.describe({
	name: "marked",
	summary: "Marked - markdown parsing",
	version: '0.1.0'
});

Npm.depends({marked: '0.3.3'});

Package.onUse(function(api){
	api.versionsFrom('1.0');
	api.addFiles('marked.js', 'server');
	api.export('marked');
});