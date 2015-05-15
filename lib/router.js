Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	trackPageView: true
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {published: -1}, limit: this.postsLimit()};
	},
	subscriptions: function() {
		this.postsSub = Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count() === this.postsLimit();
		var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
		return {
			posts: this.posts(),
			ready: this.postsSub.ready,
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.route('/', function() {
	this.redirect('/posts');
});

Router.route('/about', function() {
	this.redirect('/about/bio');
});

Router.route('/about/bio/', {
	name: 'latestBio',
	template: 'bioPage',
	waitOn: function(){
		return Meteor.subscribe('singleBio');
	},
	data: function(){
		return Bios.findOne();
	}
});

Router.route('/about/bio/:date', {
	name: 'bioPage',
	waitOn: function() {
		return Meteor.subscribe('singleBio', this.params.date);
	},
	data: function() {
		return Bios.find();
	}
});

Router.route('/posts/:slug', {
	name: 'postPage',
	waitOn: function() {
		return Meteor.subscribe('singlePost', this.params.slug);
	},
	data: function() { 
		return Posts.findOne({slug: this.params.slug}); 
	}
});

Router.route('/posts/:postsLimit?', {
	name: 'postsList'
});

Router.route('/feed.xml', {
	where: 'server',
	name: 'rss',
	action: function() {
		var feed = new RSS({
			title: "All posts from mattpolicastro.com",
			description: "All posts, updates, and more from @mattpolicastro.",
			feed_url: "http://www.mattpolicastro.com/feed.xml",
			site_url: "http://www.mattpolicastro.com",
			language: "en",
			pubDate: new Date()
		});
		
		Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post){
			var htmlContent = function(post){
				if(post.content[0] == '<'){
					return post.content;
				} else {
					return marked(post.content);
				}
			};
			feed.item({
				title: post.title,
				description: htmlContent(post),
				url: 'http://www.mattpolicastro.com/posts/' + post.slug + '/',
				guid: post._id,
				date: post.published
			})
		});
		
		this.response.write(feed.xml());
		this.response.end();
	}
});

if (Meteor.isClient){
	Router.onBeforeAction('dataNotFound', {only: 'postPage'});
}