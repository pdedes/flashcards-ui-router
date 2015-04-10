var app = angular.module('FlashCards', ['ui.router']).run(function($rootScope, $state) {
	$rootScope.$state = $state;
});