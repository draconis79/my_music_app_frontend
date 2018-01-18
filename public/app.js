console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

<<<<<<< HEAD
app.controller('mainController', ['$http', function ($http) {
  this.url = 'https://album-review-api.herokuapp.com/';
  // this.url = 'http://localhost:3001';
  this.formdata = {};
=======
app.controller('mainController', ['$http', function($http) {

>>>>>>> aa00df28d0770005af769edc86decda0356b4a17
  this.albums = [];
  this.album = {};
  this.showOne = false;
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
      // console.log("Submit new review");
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

}]);
