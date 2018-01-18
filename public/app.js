console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function($http) {

  this.albums = [];

    $http({
      method: 'GET',
      url: 'http://localhost:3000/albums'
    }).then((response) => {
      console.log(response.data);
      this.albums = response.data;
    }).catch((err) => {
      console.log(err);
    });

}]);
