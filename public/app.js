console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function($http) {

  this.albums = [];
  this.album = {};
  this.showOne = false;
  this.review = {};
  this.reviews = [];

    $http({
      method: 'GET',
      url: 'http://localhost:3000/albums'
    }).then((response) => {
      console.log("Response:", response.data);
      this.albums = response.data;
    }).catch((err) => {
      console.log("Error:", err);
    });

    this.albumShow = (album) => {
      this.showOne = !this.showOne;
      this.album = album;
      console.log("Album:", album);
    };

    this.createReview = () => {
      // console.log("Submit new review");
      $http({
        method: 'POST',
        url: 'http://localhost:3000/albums/' + this.album.id + '/reviews',
        data: this.createForm
      }).then((response) => {
        console.log("New review:", response.data);
        this.review = response.data;
        this.reviews.unshift(this.review);
      }).catch((err) => {
        console.log("Error:", err);
      })};

}]);
