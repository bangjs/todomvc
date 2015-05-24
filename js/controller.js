angular.module('todomvc').controller('todosController', [
'$scope', '$location', 'Bacon', 'bang.controller', 'todosStorage',
function ($scope, $location, Bacon, ctrl, storage) {
'use strict';

ctrl.create($scope, {
	
	status: ctrl.property(function () {
		return $location.asProperty(function () {
			var match = /^!?\/(active|completed)\/?/.exec(this.path());
			return match && match[1] || 'all';
		});
	}),
	
	todos: {
		
		all: ctrl.property(function () {
			return storage.value;
		}),
		
		active: ctrl.property(function () {
			return this.todos.all.map(function (todos) {
				return todos.filter(function (todo) {
					return !todo.completed;
				});
			});
		}),
		
		completed: ctrl.property(function () {
			return this.todos.all.map(function (todos) {
				return todos.filter(function (todo) {
					return todo.completed;
				});
			});
		})
		
	},

	add: ctrl.stream.calls(0),
	
	commitAdd: ctrl.stream(function () {
		return this.add.filter(function (data) {
			if ('title' in data && !data.title.length)
				return false;
			
			storage.push(data);
			return true;
		});
	}),
	
	edit: ctrl.stream.calls(0),
	
	editing: ctrl.property(function () {
		return Bacon.mergeAll(
			this.edit, this.commitChange.map(null)
		).startWith(null);
	}),
	
	save: ctrl.stream.calls(),
	destroy: ctrl.stream.calls(0),
	
	commitChange: ctrl.stream(function () {
		return Bacon.mergeAll(
			this.save.doAction(function (args) {
				var todos = args[0];
				var data = args[1];
				
				if (!todos)
					return;
				
				if (data && 'title' in data && !data.title.length)
					return storage.remove(todos);
				
				storage.update(todos, data);
			}),
			this.destroy.doAction(function (todo) {
				storage.remove(todo);
			})
		);
	}),
	
	input: {
		
		addTitle: ctrl.property.watch(function () {
			return this.commitAdd.map("").startWith("");
		}),
		
		editTitle: ctrl.property.watch(function () {
			return this.editing.map('.title');
		}),
		
		allCompleted: ctrl.property.watch(function () {
			return Bacon.combineWith(
				function (all, completed) {
					return all.length === completed.length;
				}, this.todos.all, this.todos.completed
			);
		})
		
	}
	
});
}]);