Meteor.publish('posts', function(options){
	return Posts.find({}, options);
});

Meteor.publish('singlePost', function(slug) {
	check(slug, String);
	return Posts.find({slug: slug});
});

Meteor.publish('singleBio', function(date) {
	check(date, Match.OneOf(String, undefined));

	return Bios.find({}, {sort: {published: -1}});
});
