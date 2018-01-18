console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function($http) {

  this.albums = [];
  this.album = {};
  this.showOne = false;
  this.showEdit = false;
  this.review = {};
  this.reviews = [];
  this.url = 'https://album-review-api.herokuapp.com/'

    $http({
      method: 'GET',
      url: this.url
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
      $http({
        method: 'POST',
        url: this.url + this.album.id + '/reviews',
        data: this.createForm
      }).then((response) => {
        console.log("New review:", response.data);
        this.review = response.data;
        this.reviews.unshift(this.review);
      }).catch((err) => {
        console.log("Error:", err);
      })};

    this.editReview = () => {
      console.log("Edit button works");
    };
      // $http({
      //   method: 'PUT',
      //   url: 'http://localhost:3000/albums/' + this.album.id + '/reviews/' + this.review.id,
      //   data: this.editForm
      // }).then((response) => {
      //   console.log("New review:", response.data);
      //   this.review = response.data;
      //   this.reviews.unshift(this.review);
      // }).catch((err) => {
      //   console.log("Error:", err);
      // })};

}]);
