console.log('app.js');

const app = angular.module('album', []);

app.controller('mainController', ['$http', function($http) {

  this.message = 'controller works';
  this.album = [];

  $http({
    method: 'GET',
    url: 'http://localhost:3000/albums',
  }).then(response => {
    console.log('response: ', response);
    this.albums = response.data;
  }).catch(reject => {
    console.log('reject: ', reject);
  });
  this.processForm = () => {
    console.log('Form data: ', this.formdata);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/albums',
      data: this.formdata
    }).then(response => {
      console.log('response: ', response);
      this.albums.unshift(response.data);
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };

}]);
