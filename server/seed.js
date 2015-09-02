Meteor.startup(function () {
	var dummyUserEmail = 'test@test.com';
	if(Meteor.users.find({'emails.address':dummyUserEmail}).count()===0){
		var ownerId = Accounts.createUser({
			email:dummyUserEmail,
			password:'test'
		});
			[
			{
				name:'SRH',
				gameIds:[],
				ownerId:ownerId			
			},
			{
				name:'KKR',
				gameIds:[],
				ownerId:ownerId			
			},
			{
				name:'Mumbai Indians',
				gameIds:[],
				ownerId:ownerId
			}
		].forEach(function (team) {
			Teams.insert(team);
		});
		var team1 = Teams.find().fetch()[0];
		var team2 = Teams.find().fetch()[1];
		var game = {
			complete:false,
			ownerId:ownerId,
			teams:[
				{name:team1.name,_id:team1._id,score:0},
				{name:team2.name,_id:team2._id,score:0}
			]
		};
		gameId = Games.insert(game);
		Teams.update({_id:team1._id}, {$addToSet:{gameIds:gameId}});	
		Teams.update({_id:team2._id}, {$addToSet:{gameIds:gameId}});	
	}
});