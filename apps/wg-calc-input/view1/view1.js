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

  if(localStorage.sendAs) {
    view1.sendAs = localStorage.sendAs;
  } else {
    view1.sendAs = "Bartsch";
  }

  if(localStorage.sendTo) {
    view1.sendTo = localStorage.sendTo;
  } else {
    view1.sendTo = "timsmuell@gmail.com";
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

  view1.moneySum = function(items){
    var i, sum;
    sum = 0;
    for(i=0; i < items.length; i++) {
      sum += items[i].money;
    }
    return sum;
  };

  view1.writeSendAsToLocalstorage = function(){
    localStorage.sendAs = view1.sendAs;
  };

  view1.writeSendToToLocalstorage = function(){
    localStorage.sendTo = view1.sendTo;
  };

// make email editable
// add sender name


}]);
