Template.teams.helpers({
	teams: function () {
		return Teams.find();
	},
	isCreatingTeam:function(){
		return Session.get('isCreatingTeam');
	}
});

Template.teams.events({
	'click .create': function (e,tmp) {
		e.preventDefault();
		Session.set('isCreatingTeam', true);
	},
	'click .cancel': function (e,tmp) {
		e.preventDefault();
		Session.set('isCreatingTeam',false);
	},
	'submit form.create-team': function (e,tmp) {
		e.preventDefault();
		var form = e.target;
		var teamName = form.name.value;
		if(teamName.length){
			Teams.insert({name:teamName,ownerId:Meteor.userId()},function(error,_id){
				if(error){
					alert(error);
					Session.set('isCreatingTeam',true);
					Tracker.afterFlush(function () {
						tmp.$('input[name=name]').val(teamName);
					});
				}
			});
			Session.set('isCreatingTeam',false);
		}else{
			alert('Error!!..Team Name Cannot Be Empty');
		}
	}
});