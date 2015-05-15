Template.postItem.helpers({
	noLink: function() {
		return this.url === undefined;
	},
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	niceDate: function(){
		return this.published.toLocaleDateString();
	}
});