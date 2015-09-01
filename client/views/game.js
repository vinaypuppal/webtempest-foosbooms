Template.game.helpers({
	completed: function () {
		// console.log(this);
		return this.complete;
	}
});

Template.game.events({
	'click .finish': function (e,tmp) {
		e.preventDefault();
		Games.update({_id:this._id}, {$set:{complete:true}});
	},
	'click .delete':function(e,tmp){
		e.preventDefault();
		var gameId=this._id;
		var team1Id=this.teams[0]._id;
		var team2Id=this.teams[1]._id;
		Games.remove(gameId,function(error){
			if(!error){
				Teams.update({_id:team1Id}, {$pull:{gameIds:gameId}});
				Teams.update({_id:team2Id}, {$pull:{gameIds:gameId}});
			}
		});

	},
	'click .one-minus':function(e,tmp){
		e.preventDefault();
		Games.update({_id:this._id}, {$inc:{'teams.0.score':-1}});
	},
	'click .one-plus':function(e,tmp){
		e.preventDefault();
		Games.update({_id:this._id}, {$inc:{'teams.0.score':1}});

	},
	'click .two-minus':function(e,tmp){
		e.preventDefault();
		Games.update({_id:this._id}, {$inc:{'teams.1.score':-1}});
	},
	'click .two-plus':function(e,tmp){
		e.preventDefault();
		Games.update({_id:this._id}, {$inc:{'teams.1.score':1}});

	}
});