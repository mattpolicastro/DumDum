Meteor.publish('posts', function(options){
	check(options, {
		sort: Object,
		limit: Number
	});
	return Posts.find({}, {fields: {title: 1, slug: 1, published: 1, content: 1}}, options);
});

Meteor.publish('singlePost', function(slug) {
	check(slug, String);
	return Posts.find({slug: slug});
});

Meteor.publish('singleBio', function(date) {
	check(date, Match.OneOf(String, undefined));

	return Bios.find({}, {sort: {published: -1}});
});
