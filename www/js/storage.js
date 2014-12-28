angular.module('starter.storage', ['LocalForageModule'])
.config(['$localForageProvider', function($localForageProvider){
    $localForageProvider.config({
        driver      : 'localStorageWrapper', // if you want to force a driver
        name        : 'starter', // name of the database and prefix for your data, it is "lf" by default
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'keyvaluepairs', // name of the table
        description : 'some description'
    });
}])

.factory("faker", ['$window', function ($window) {
    // the if check is unnecessary since an undefined
    // is returned anyway when the Snap doesn't exist.
    return $window.faker;
}])

// see https://github.com/ccoenraets/cordova-tutorial/blob/master/starter-www/js/services/localstorage/EmployeeService.js
.factory('DataStorage', ['$q', '$localForage', 'faker', function($q, $localForage, faker) {

    this.initialize = function() {

        var list = [],
            length = 10;
        faker.locale = 'fr';
        for(var i=0; i<= length; i++){
            list.push({
                "id": i,
                "firstName": faker.name.firstName(),
                "lastName": faker.name.lastName(),
                "avatar": faker.image.avatar(),
                "image": faker.image.image(),
                "url": faker.image.imageUrl(),
                "description": faker.lorem.sentence(),
                "phoneNumber": faker.phone.phoneNumber(),
                "email": faker.internet.email()
            });
        }

        var deferred = $q.defer();
        $localForage.setItem('list', JSON.stringify(list)
        ).then(function(value){
            deferred.resolve(JSON.parse(value));
        }, function(error) {
            deferred.reject(JSON.parse(value));
            console.error(error);
        });

        return deferred.promise;
    };

    this.findById = function (id) {
        var deferred = $q.defer(),
            list = null,
            self = this;
        $localForage.getItem('list').then(function(data){
            if('undefined'=== typeof data) {
                // db not found: initializing then findById again
                self.initialize().then(function(){
                   return self.findById(id);
                });
                deferred.reject('cannot findById on uninitialized/missing db ');

                return deferred.promise;
            }
            list = data;
        }, function(error) {
            console.log('db found, but list not found', error);
        }).then(function(){
            list = JSON.parse(list);
            var l = list.length;
            for (var i = 0; i < l; i++) {
                if (list[i].id === id) {
                    deferred.resolve(list[i]);
                    break;
                }
            }
        });

        return deferred.promise;
    };


    this.findByName = function (searchKey) {
        var deferred = $q.defer(),
            list = null,
            self = this;

        $localForage.getItem('list').then(function (data) {
            if ('undefined' === typeof data) {
                // db not found: initializing then findAll again
                self.initialize().then(function () {
                    return self.findByName(searchKey);
                });
                deferred.reject('cannot findByName on uninitialized/missing db ');

                return deferred.promise;
            }
            list = data;
        }, function (error) {
            console.log('db found, but list not found', error);
        }).then(function () {
            list = JSON.parse(list);
            var results = list.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
        });

        return deferred.promise;
    };

    this.findAll = function () {
        var deferred = $q.defer(),
            list = null;
        var self = this;
        $localForage.getItem('list').then(function (data) {
            if ('undefined' === typeof data) {
                // db not found: initializing then findAll again
                self.initialize().then(function () {
                    return self.findAll();
                });
                deferred.reject('cannot findAll on uninitialized/missing db ');

                return deferred.promise;
            }
            list = data;
        }, function (error) {
            console.log('db found, but list not found', error);
        }).then(function () {
            deferred.resolve(JSON.parse(list));
        });

        return deferred.promise;
    }
    return {
        faker: faker,
        initialize: this.initialize,
        findById: this.findById,
        findByName: this.findByName,
        findAll: this.findAll
    }

}]);
