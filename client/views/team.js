Template.team.helpers({
	isEditingTeam: function () {
		return Session.get('isEditingTeam') === this._id;
	}
});
Template.team.events({
	'click a.remove':function(e,tmp){
			e.preventDefault();
			// console.log(this);
			Teams.remove(this._id);
	},
	'submit form.edit-team':function(e,tmp){
		e.preventDefault();
		var teamName = tmp.$('input[name=name]').val();
		var self = this;
		if(teamName.length){
			Meteor.call('teamUpdate',self._id,teamName, function (error) {
				if(error){
					alert(error.reason);
					Session.set('isEditingTeam', self._id);
					Tracker.afterFlush(function(){
						tmp.$("input[name=name]").val(teamName);
						tmp.$("input[name=name]").focus();
					});
				}
			});
			Session.set('isEditingTeam',null);
		}else{
			alert('Error!! Team Name cannot be Empty!');
		}
	},
	'click a.cancel':function(e,tmp){
		e.preventDefault();
		Session.set('isEditingTeam',null);
	},
	'click a.edit':function(e,tmp){
		e.preventDefault();
		Session.set('isEditingTeam',this._id);
	}
});