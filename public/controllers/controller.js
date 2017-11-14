/*eslint no-unused-vars: 1*/
/*eslint no-undef: 1*/
const myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
	console.log('hello from controller!');
	const refresh = () => {
		$http.get('/Sources').success((res) => {
			console.log('got data');
			$scope.Sources = res;
			$scope.source = '';
		});
	};
	refresh();
	$scope.addSources = () => {
		console.log($scope.source);
		$http.post('/Sources', $scope.source).success((res) => {
			console.log(res + 'is add ');
			refresh();
		});
	};
	$scope.removeSources = (id) => {
		console.log(id + 'is going to be deleted');
		$http.delete('/Sources/' + id).success(() => {
			console.log('$scope.removSources !!');
		});
		refresh();
	};
	$scope.editSources = (id) => {
		console.log(id + ' is editting');
		$http.get('/Sources/' + id).success((res) => {
			$scope.source = res;
		});
	};
	$scope.update = (id) => {
		console.log(id + 'is updating');
		$http.put('/Sources/' + id, $scope.source).success((response)=> {
			refresh();
		});
	};
	$scope.deselect = () => {
		$scope.source = '';
	};
}]);