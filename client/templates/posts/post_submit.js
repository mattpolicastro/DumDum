Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var post = {
			title: $(e.target).find('[name=title]').val(),
			link: $(e.target).find('[name=url]').val()
		};
		
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('postPage', {_id: result._id});  
    });
	}
});