console.log('app.js');

const app = angular.module('AlbumReviewApp', []);

app.controller('mainController', ['$http', function($http) {

  this.albums = [];
  this.album = {};
  this.showOne = false;
  this.showEdit = 0;
  this.review = {};
  this.reviews = [];
  this.url = 'https://album-review-api.herokuapp.com/'

    $http({
      method: 'GET',
      url: this.url + 'albums'
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
        url: this.url + "albums/" + this.album.id + '/reviews',
        data: this.createForm
      }).then((response) => {
        console.log("New review:", response.data);
        this.review = response.data;
        this.reviews.unshift(this.review);
      }).catch((err) => {
        console.log("Error:", err);
      })};

    this.editReview = (review) => {
      this.review = review;
      console.log(this.review);
      console.log("Edit button works");
      $http({
        method: 'PUT',
        url: this.url + "albums/" + this.album.id + '/reviews/' + this.review.id,
        data: this.editForm
      }).then((response) => {
        console.log("Edited review:", response.data);
        this.review = response.data;
        // this.reviews.unshift(this.review);
      }).catch((err) => {
        console.log("Error:", err);
      })};

      this.showThisEdit = (review) => {
        this.editForm = {};
        this.showEdit = review.id;
      };

      this.deleteReview = (reviewToDelete) => {
        console.log("Deleting:", reviewToDelete.id);
        $http({
          method: 'DELETE',
          url: this.url + "albums/" + this.album.id + '/reviews/' + reviewToDelete.id
        }).then((response) => {
          const reviewIndex = this.reviews.findIndex(review => this.review.id === reviewToDelete.id);
          this.reviews.splice(reviewIndex, 1);
        }).catch((err) => {
          console.log("Error:", err);
        })};


}]);
