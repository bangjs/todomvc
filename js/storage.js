angular.module('todomvc').service('todosStorage', [
'$window', 'Bacon', 'bang.scope',
function ($window, Bacon, bangScope) {
'use strict';

	var KEY = 'todos-bangjs';
	
	var push = bangScope.functionAsStream(this, 'push').map('.0').map(function (data) {
		return angular.extend({ completed: false }, data);
	});
	
	var update = bangScope.functionAsStream(this, 'update').map(function (args) {
		var items = args[0];
		var data = args[1];
		
		if (!angular.isArray(items))
			items = [items];
		
		items.forEach(function (item) {
			angular.extend(item, data);
		});
		
		return items;
	});
	
	var remove = bangScope.functionAsStream(this, 'remove').map('.0').map(function (items) {
		if (!angular.isArray(items))
			items = [items];
		
		return items;
	});
	
	this.value = Bacon.mergeAll(push, remove).
		scan(JSON.parse($window.localStorage.getItem(KEY) || '[]'), function (current, change) {
			if (!angular.isArray(change))
				current.push(change);
			else
				change.forEach(function (item) {
					current.splice(current.indexOf(item), 1);
				});
			return current;
		}).
		flatMapLatest(function (value) {
			return update.map(value).startWith(value);
		}).
		doAction(function (value) {
			$window.localStorage.setItem(KEY, angular.toJson(value));
		}).
		toProperty();
	
}]);