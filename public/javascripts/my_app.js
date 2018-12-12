angular.module('myApp', []).
  controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
    $http.get('/user/getRecipes').success(function(data){
       $scope.RecipesList = data
      }).error(function(data, status, headers, config) {
        console.log("error")
      $scope.error = data;
    });
    $scope.create = function(title, instruction) {
      console.log("creating:" + {title:title, instruction:instruction})
      $http.post('/user/addRecipe', {title:title, instruction:instruction}).success(function(data){
      alert(data)
      });
    };
    $scope.addRecipe = function(title, instruction) {
      var title = $scope.user.recipe_title 
      var instruction = $scope.user.instruction
      $scope.user.recipe_title = ""
      $scope.user.instruction = ""
      console.log("creating:" + {title:title, instruction:instruction})
      $http.post('/user/addRecipe', {title:title, instruction:instruction}).success(function(data){
          $scope.getRecipes();
      });
    };
    $scope.removeRecipe = function(Recipe) {
      $http.post('/user/removeRecipe', Recipe).success(function(data){
        
        $scope.getRecipes();
      });
    };
    $scope.getRecipes = function() {
      $http.get('/user/getRecipes').success(function(data){
       $scope.RecipesList = data
       
      });
    };
    $scope.displayRecipe = function(Recipe) {
      $scope.user.recipe_title = Recipe.title
      $scope.user.instruction = Recipe.instruction
    };
    $scope.randomDinner = function(){
       $scope.getRecipes();
       var min = 0; 
       var max= $scope.RecipesList.length;  
       var random = Math.floor(Math.random() * (max - min) ) + min;
       $scope.dinnerOption = $scope.RecipesList[random].title;
       $scope.instructionOption = $scope.RecipesList[random].instruction;
    }
  
  }]);
  
function sorry()
{
  alert("Sorry! that feature is still under construction")
}