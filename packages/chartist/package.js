Package.describe({
	name: 'chartist',
	version: '0.7.4'
});

Npm.depends({'chartist': '0.7.4'});

Package.onUse(function(api){
	api.addFiles(['.npm/package/node_modules/chartist/dist/chartist.min.js',
								'.npm/package/node_modules/chartist/dist/chartist.min.css'], 'client');
});