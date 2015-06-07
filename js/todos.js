angular.module('todomvc').controller('todos', function ($scope, $location, Bacon, bang, store) { 'use strict';

bang.component($scope, {
	
	status: bang.property.digest(function () {
		return $location.asProperty(function () {
			var match = /^!?\/(active|completed)\/?/.exec($location.path());
			return match && match[1] || 'all';
		});
	}),
	
	items: {
		
		all: bang.property.digest(function () {
			return store.read;
		}),
		
		active: bang.property.digest(function () {
			return this.items.all.map(function (items) {
				return items.filter(function (item) {
					return !item.completed;
				});
			});
		}),
		
		completed: bang.property.digest(function () {
			return this.items.all.map(function (items) {
				return items.filter(function (item) {
					return item.completed;
				});
			});
		})
		
	},
	
	add: bang.stream.function(function (data) {
		return data && 'title' in data && !data.title ? null :
			Bacon.fromPromise(store.create(data)); 
	}),
	
	edit: bang.stream.function(angular.identity),
	
	editing: bang.property.digest(function () {
		return this.edit.merge(
			this.save.merge(this.destroy).map(null)
		).startWith(null);
	}),
	
	save: bang.stream.function(function (items, data) {
		return Bacon.fromPromise(
			data && 'title' in data && !data.title ?
				store.delete(items) :
				store.update(items, data)
		);
	}),
	
	destroy: bang.stream.function(function (items) {
		return Bacon.fromPromise(store.delete(items));
	}),
	
	input: {
		
		titleAdd: bang.property.watch(function () {
			return this.add.filter(angular.identity).map("").startWith("");
		}),
		
		titleEdit: bang.property.watch(function () {
			return this.editing.map('.title');
		}),
		
		allCompleted: bang.property.watch(function () {
			return this.items.all.combine(this.items.completed, function (all, completed) {
				return all.length === completed.length;
			});
		})
		
	}
	
});
});