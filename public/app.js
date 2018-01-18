console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function ($http) {
  this.url = 'https://album-review-api.herokuapp.com/';
  // this.url = 'http://localhost:3001';
  this.formdata = {};
  this.albums = [];
  this.album = {};
  this.toggle = true;
  this.reviews = [];

  this.getAlbum = (album) => {
    console.log('Clicked the album');
    $http({
      method: 'GET',
      url: this.url + album.id,
    }).then((response) => {
      console.log(response.data);
      this.album = response.data;
      this.toggle = !this.toggle;
      console.log(this.toggle);
    }).catch((err) => {
      console.log(err);
    });
  };

  this.allAlbums = () => {

    $http({
      method: 'GET',
      url: this.url,
    }).then(response => {
      console.log('response is ...: ', response);
      this.albums = response.data;
      console.log(this.toggle);
    }).catch(reject => {
      console.log('reject is ...: ', reject);
    });
  };

  this.allAlbums();

  this.processForm = (id) => {
    console.log("Id is:", id);
    console.log(this.formdata);
    console.log('form data: ', this.formdata.form[id]);
    $http({
      method: 'POST',
      url: this.url + this.album.id + '/reviews',
      data:  this.formdata.form[id],
    }).then(response => {
      console.log('response: is ...', response);
      this.albums.unshift(response.data);
      this.allAlbums();
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };

  this.editReview = (review) => {
    console.log('EDIT the REVIEW');
    $http({
      method: 'PUT',
      url: this.url + this.album.id + '/reviews/' + this.album.reviews[0].id,
    }).then((response) => {
      console.log(response.data);
      this.album = response.data;
      this.allAlbums();
    }).catch((err) => {
      console.log(err);
    });
  };

  this.deleteReview = (review) => {
    console.log('DELETED the REVIEW');
    $http({
      method: 'DELETE',
      url: this.url + this.album.id + '/reviews/' + this.album.reviews[0].id,
    }).then((response) => {
      console.log(response.data);
      this.album = response.data;
      this.allAlbums();
    }).catch((err) => {
      console.log(err);
    });
  };

},
]);
