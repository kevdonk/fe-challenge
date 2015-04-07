angular.module('news',[])
.controller("main", ['$scope', 'EventService', 'AccountService', function($scope, EventService, AccountService) {
	AccountService.getAccounts()
	.then(function (accountData) {
		$scope.accounts = accountData.data;
		return EventService.getEvents();
	})
	.then (function (eventData) {
		$scope.events = eventData.data;
		getAccountData();
	});

	var getAccountData = function() {
		$scope.events.forEach(function(event) {
			event.time = new Date(event.time);
			debugger;
			event.account = getAccountById(event.accountId);
		});
	};

	var getAccountById = function(id) {
		return _.find($scope.accounts,function(account) {
			return account.accountId === id;
		});
	};
	$scope.sortBy = 'time';
	$scope.reverseBool = true;

	$scope.metaCategories = [
		{
			'value':'event.eventType',
			'display':'Event Type'
		},
		{
			'value':'account.firstName',
			'display':'First Name'
		},
		{
			'value':'account.lastName',
			'display':'Last Name'
		}
	];

}])
.factory('EventService', ['$http', function($http) {
	var events = {};

	var getEvents = function() {
		return $http.get('/events.json').success(function(res) {
			return res.data;
		});
	}

	return {
		getEvents: getEvents
	};
}])
.factory('AccountService', ['$http', function($http) {
	var accounts = {};

	var getAccounts = function() {
		return $http.get('/accounts.json').success(function(res) {
			return res.data;
		});
	}
	return {
		getAccounts: getAccounts
	};
}])
.directive('feedItem', function() {
	return {
		restrict: "A",
		scope: {
			event:'='
		},
		templateUrl: "feeditem.tmpl.html"
	};
})
;