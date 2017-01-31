'use strict';

angular.module('utils.services', [])

.service('dataService', function($http) {
    var apiURL = "https://api.xmrpool.net";

    // delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function(url, callbackFunc, errCallback) {
        $http({
            method: 'GET',
            url: apiURL + url,
            // params: 'limit=10, sort_by=created:desc',
            // headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            if (errCallback && data != undefined) errCallback(data); else console.log("Network Error");
        });
     }
})

.service('timerService', function($interval) {
    var timer;
    var listeners = {};

    this.startTimer = function(ms) {
        timer = $interval(function() {
            Object.keys(listeners).forEach(function(key,index) {
                return listeners[key]();
            });
        }, ms);
    }

    this.stopTimer = function(){
        $interval.cancel(timer);
    }

    this.register = function(callback, key){
        // console.log("Registering requests for", key);
        return listeners[key] = callback;
    }

    this.remove = function(key){
        // console.log("Destroying requests for", key);
        delete listeners[key];
    }
})

.service('minerService', function(dataService, timerService, $localStorage, ngAudio) {
  var addrStats = {};
  var callback;
  var storage = $localStorage;
  
  this.trackAddress = function (addr) {
    addrStats[addr] = {};
    track();
  }

  this.getData = function (){
    return addrStats;
  }

  this.setAlarm = function(addr, bool){
    addrStats[addr].alarm = bool;
    storage.minerStats[addr].alarm = bool;
  }

  var track = function(){
    Object.keys(addrStats).forEach(function(key,index) {
      dataService.getData("/miner/"+key+"/stats", function(data){
        addrStats[key] = Object.assign(addrStats[key], data);

        // check and inject alarm var
        if (addrStats[key].alarm == undefined) {
          addrStats[key].alarm = false;
        }

        // update
        storage.minerStats = addrStats;
        callback(addrStats);
      });
    });

  }

  this.start = function (cb){
    timerService.register(track, 'minerStats');
    addrStats = storage.minerStats || {} ;
    callback = cb;
    track(); // also run immediately
  }
});