Template.games.helpers({
	games: function () {
		return Games.find();
	},
	isCreatingGame:function(){
		return Session.get('isCreatingGame');
	},
	teams:function(){
		return Teams.find();
	}
});

Template.games.events({
	'click .create': function (e,tmp) {
		e.preventDefault();
		Session.set('isCreatingGame',true);
	},
	'click .cancel':function (e,tmp) {
		e.preventDefault();
		Session.set('isCreatingGame',false);
	},
	'submit form.create-game':function (e,tmp) {
		e.preventDefault();
		var teamOneId=tmp.$('select[name=teamOne]').val();
		var teamTwoId =tmp.$('select[name=teamTwo]').val();
		Meteor.call('gamesInsert',teamOneId,teamTwoId, function (error, response) {
			if(error){
				alert(error.reason);
				Session.set('isCreatingGame', true);
				Tracker.afterFlush(function(){
				    tmp.$("select[name=teamOne]").val(teamOneId);
				    tmp.$("select[name=teamTwo]").val(teamTwoId);	
				});
			}
		});
		Session.set('isCreatingGame',false);
	},
});