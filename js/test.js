	(function() {
		//getting rid of the global variables
		 
		window.App = {
			Models : {},
			Views : {},
			Collections : {}
		};

		//little template helper
		window.template = function(id) {
			return _.template($('#' + id).html()); //get a template and compile it straight away
		};

		App.Models.Task = Backbone.Model.extend({

		});
		App.Views.Task = Backbone.View.extend({
			tagName: 'li',
			template: template('taskTemplate'),
			initialize: function() {
				this.model.on('change', this.render, this);
			},
			events: {
				'click .edit': 'edit'	 
			},

			render: function() {
				 //_.bindAll(this, 'edit', 'render');
				var t = this.template(this.model.toJSON());
				this.$el.html(t);
				return this;
			},
			edit : function() {
				var v = prompt('Please, edit', this.model.get('title'));
				console.log(v);
				if (!v) { return; } else { this.model.set('title', v);}
			}			
			
		});
		App.Views.Tasks = Backbone.View.extend({
			tagName: 'ul',
			render: function() { 
				this.collection.each(this.addOne, this);
				return this;
			},
			addOne : function(task) {
				var p = new App.Views.Task ({model: task});
				p.render();
				this.$el.append(p.el);

			}
		});
		App.Collections.Tasks = Backbone.Collection.extend({
			model: App.Models.Task	
		});

		var a = new App.Collections.Tasks([
		{
			title: 'Go to the store',
			priority: 4
		},
		{
			title: 'Learn sum backbone',
			priority: 5
		},
		{
			title: 'Watch TV',
			priority: 1
		}
		]);
		var c = new App.Views.Tasks ({collection: a});
		$('body').append(c.render().el);
	
	
	}());