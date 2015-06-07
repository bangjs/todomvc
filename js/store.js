angular.module('todomvc').service('store', function Store($window, Bacon, bang) { 'use strict';

var KEY = 'todos-bangjs';

bang.component(this, {
	
	create: bang.stream.function(function (data) {
		return angular.extend({ completed: false }, data);
	}),
	
	read: bang.property.expose(function () {
		var initial = angular.fromJson($window.localStorage.getItem(KEY) || '[]');
		return this.create.merge(this.delete).
			scan(initial, function (current, change) {
				if (!angular.isArray(change))
					current.push(change);
				else
					change.forEach(function (item) {
						current.splice(current.indexOf(item), 1);
					});
				return current;
			}).
			flatMapLatest(function (value) {
				return this.update.map(value).startWith(value);
			}.bind(this)).
			doAction(function (value) {
				$window.localStorage.setItem(KEY, angular.toJson(value));
			});
	}),
	
	update: bang.stream.function(function (items, data) {
		if (!items)
			items = [];
		if (!angular.isArray(items))
			items = [items];
		
		items.map(function (item) {
			return angular.extend(item, data);
		});
		
		return items;
	}),
	
	delete: bang.stream.function(function (items) {
		if (!items)
			items = [];
		if (!angular.isArray(items))
			items = [items];
		
		return items;
	})
	
});
});