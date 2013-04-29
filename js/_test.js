	(function() {
		//getting rid of the global variables
		window.template = function(id) {
			return _.template($('#' + id).html()); //get a template and compile it straight away
		} 
		window.App = {
			Models : {},
			Views : {},
			Collections : {}
		};
	
	//person Model
	App.Models.Person = Backbone.Model.extend({
		defaults : {
			name: 'John Doe',
			age: 30,
			occupation: 'robber'
		}		
	});
	
	//a view for a person
	App.Views.PersonView = Backbone.View.extend({
		tagName: 'li',
		template: template('template'),
		render: function() {
			var that = this;
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//a view for all people
	App.Views.PeopleView = Backbone.View.extend({
		tagName: 'ul',
		initialize: function() {
			
		},
		render: function() {
			this.collection.each (function(person) { //passing the model
				var personView = new App.Views.PersonView ({model: person});
				//append to root element
				this.$el.append(personView.render().el);

			}, this);
			return this;					
		}
	});
	App.Collections.PeopleCollection = Backbone.Collection.extend({
		model: App.Models.Person
	});
	// var person = new Person();
	// var personView = new PersonView({model: person});
	var peopleCollection = new App.Collections.PeopleCollection([ 
		{name: 'Marina', age: 28, occupation: 'developer'},
		{name: 'Jeffrey Way', age: 27, occupation: 'developer'}
	]);
	var peopleView = new App.Views.PeopleView({collection: peopleCollection});
	$(document.body).append(peopleView.render().el);

	console.log(App.Collections)
	}());