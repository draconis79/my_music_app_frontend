console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function ($http) {
  this.formdata = {};
  this.albums = [];
  this.album = {};
  this.toggle = true;
  this.reviews = [];

  this.getAlbum = (album) => {
    console.log('Clicked the album');
    $http({
      method: 'GET',
      url: 'http://localhost:3000/albums/' + album.id,
    }).then((response) => {
      console.log(response.data);
      this.album = response.data;
      this.toggle = !this.toggle;
      console.log(this.toggle);
    }).catch((err) => {
      console.log(err);
    });
  };

  $http({
    method: 'GET',
    url: 'http://localhost:3000/albums',
  }).then(response => {
    console.log('response is ...: ', response);
    this.albums = response.data;
    console.log(this.toggle);
  }).catch(reject => {
    console.log('reject is ...: ', reject);
  });

  this.processForm = () => {
    console.log('form data: ', this.formdata);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/albums/' + this.album.id + '/reviews',
      data: this.formdata,
    }).then(response => {
      console.log('response: is ...', response);
      this.albums.unshift(response.data);
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };

  this.deleteReview = (review) => {
    console.log('DELETED the REVIEW');
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/albums/' + this.album.id + '/reviews/' + this.album.reviews[0].id,
    }).then((response) => {
      console.log(response.data);
      this.album = response.data;
      console.log(this.toggle);
    }).catch((err) => {
      console.log(err);
    });
  };

},
]);
