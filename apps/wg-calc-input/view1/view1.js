'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'view1'
  });
}])

.controller('View1Ctrl', [function() {
  var view1 = this;

  try {
    view1.items = JSON.parse(localStorage.items);
  } catch (e) {
    view1.items = [];
  }

  view1.emailBody = itemsToEmailBody(view1.items);
  view1.moneyInput = "";

  function itemsToEmailBody(items) {
    var body = "";
    for (var i = 0; i < items.length; i++) {
      body += items[i].money + ";" + items[i].user + "%0A";
    }
    return body;
  }

  function afterItemsChange(){
    localStorage.items = JSON.stringify(view1.items);
    view1.emailBody = itemsToEmailBody(view1.items);
  }

  view1.addItem = function(user) {
    if (!view1.moneyInput) {
      return;
    }
    view1.items.unshift({
      user: user,
      money: view1.moneyInput
    });
    afterItemsChange();
    view1.moneyInput = "";
    angular.element('#money-input').focus();
  };

  view1.removeItem = function(index){
    view1.items.splice(index, 1);
    afterItemsChange();
  };

  view1.resetItems = function(){
    view1.moneyInput = "";
    view1.items = [];
    afterItemsChange();
  };




}]);
