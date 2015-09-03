Router.configure({
	layoutTemplate:'layout',
	loadingTemplate:'loading'
});
Router.route('/',{
	name:'games',
	waitOn:function(){
		return [Meteor.subscribe('games'),Meteor.subscribe('teams')];
	},
	fastRender:true
});
Router.route('/teams',{
	name:'teams',
	waitOn:function(){
		return Meteor.subscribe('teams');
	},
	fastRender:true
});

var requireLogin = function(){
	if(!Meteor.user()){
		if(Meteor.loggingIn())
			this.render('loading');
		else	
			this.render('accessDenied')
	}else{
		this.next();
	}
}

Router.onBeforeAction(requireLogin);