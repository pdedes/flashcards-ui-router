app.config(function($stateProvider, $urlRouterProvider) {
	//base case for any umnatched url
	$urlRouterProvider.when('', '/');
	// $urlRouterProvider.when('#/', '/');

	$stateProvider
		.state('form', {
			url: '/form',
			templateUrl: 'js/partials/form.html'
		})

		.state('statistics', {
			url: '/statistics',
			templateUrl: 'js/partials/statistics.html'
		})

		.state('flashcards', {
			url: '/flashcards',
			templateUrl: 'js/partials/flashcards.html'
		})

		.state('home', {
			url: '/',
			templateUrl: 'js/partials/home.html'
		})

		.state('flashcards.category', {
			url: '/:category',
			templateUrl: 'js/partials/filteredcards.html',
			controller: function ($scope, $stateParams, FlashCardsFactory) {
			    
				console.log("StateParams: ", $stateParams);
				console.log("category", $stateParams.category);

				if($stateParams.category === 'All') {
					$stateParams.category = null;
				}

			    $scope.chosenCategory = $stateParams.category || 'All';
			    $scope.loading = true;
			    $scope.failed = false;
			    FlashCardsFactory.getFlashCards($stateParams.category).then(function (cards) {
			        $scope.loading = false;
			        $scope.flashCards = cards;
			    }).catch(function(err){
			        $scope.loading = false;
			        $scope.error = err;
			    });
			}
		});
});