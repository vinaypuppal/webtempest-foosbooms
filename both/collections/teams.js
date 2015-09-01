Teams = new Mongo.Collection('teams');
Teams.allow({
	insert: function (userId, doc) {
		return (userId && doc.ownerId === userId);
	},
	remove: function (userId, doc) {
		return doc.ownerId === userId;
	},
	fetch: ['ownerId']
});

Meteor.methods({
	teamUpdate:function(teamId,newName){
		check(Meteor.userId(),String);
		check(teamId,String);
		check(newName,String);
		var team = Teams.findOne({_id:teamId});
		if(team){
			Teams.update({_id:team._id}, {$set:{name:newName}},function(error){
				if(!error){
					if(team.gameIds){
						var games = Games.find({_id:{$in:team.gameIds}});
						if(games.count()){
							_.each(games.fetch(),function(game){
								var t = _.findWhere(game.teams,{_id:team._id});
								if(t != null){
									t.name=newName;
									Games.update({_id:game._id},{$set:{teams:game.teams}});
								}
							});
						}
					}
					
				}	
			});
		}else{
			throw new Meteor.Error('team-does-not-exist',"This team doesn't exist in the database");
		}
	}
})