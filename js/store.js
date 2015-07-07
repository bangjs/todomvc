angular.module('todomvc').service('store', function Store($window, Bacon, bang) { 'use strict';

var KEY = 'todos-bangjs';

bang.component(this, {
	
	create: bang.stream.method(function (data) {
		return angular.extend({ completed: false }, data);
	}),
	
	read: bang.property.expose(function (sink, me) {
		
		var value = angular.fromJson($window.localStorage.getItem(KEY) || '[]');
		sink(value);
		
		this.create.onValue(function (item) {
			value.push(item);
			sink(value);
		});
		
		this.update.onValue(function () {
			sink(value);
		});
		
		this.delete.onValue(function (items) {
			items.forEach(function (item) {
				value.splice(value.indexOf(item), 1);
			});
			sink(value);
		});
		
		me.onValue(function (v) {
			$window.localStorage.setItem(KEY, angular.toJson(v));
		});
		
	}),
	
	update: bang.stream.method(function (items, data) {
		if (!items) items = [];
		if (!angular.isArray(items)) items = [items];
		
		items.map(function (item) {
			return angular.extend(item, data);
		});
		
		return items;
	}),
	
	delete: bang.stream.method(function (items) {
		if (!items) items = [];
		if (!angular.isArray(items)) items = [items];
		
		return items;
	})
	
});
});