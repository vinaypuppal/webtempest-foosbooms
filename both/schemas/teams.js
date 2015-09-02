Teams.attachSchema(new SimpleSchema({
	name:{
		type:String,
		max:30,
		index:true,
		unique:true
	},
	ownerId:{
		type:String
	},
	gameIds:{
		type:[String],
		optional:true
	},
	createdAt: {
	    type: Date,
	    autoValue: function() {
	      if (this.isInsert) {
	        return new Date;
	      } else if (this.isUpsert) {
	        return {$setOnInsert: new Date};
	      } else {
	        this.unset();
	      }
	    }
	  },
	  
	  updatedAt: {
	    type: Date,
	    autoValue: function() {
	      if (this.isUpdate) {
	        return new Date;
	      }
	    },
	    denyInsert: true,
	    optional: true
	  }
}));