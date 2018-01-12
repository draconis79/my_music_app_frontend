console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function ($http) {

  this.albums = [];

  $http({
    method: 'GET',
    url: 'http://localhost:3000/albums',
  }).then(response => {
    console.log('response is ...: ', response);
    this.albums = response.data;
  }).catch(reject => {
    console.log('reject is ...: ', reject);
  });

  this.processForm = () => {
    console.log('form data: ', this.formdata);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/albums',
      data: this.formdata
    }).then(response => {
      console.log('response: is ...', response);
      this.albums.unshift(response.data);
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };

}]);
