// /*
//  * IIFE to encapsulate code and avoid global variables
//  */
// (function() {

//     /*
//      * attaching results controller function to the turtleFacts module 
//      */
//     angular
//         .module("app")
//         .controller("signinCtrl", SigninCtrl);

//     /*
//      * injecting the [] into the lessons controller 
//      * using the $inject method.
//      *
//      * Injecting dependencies like this is done so as to avoid issues when 
//      * uglifying the code. Function arguments will get shortened during the 
//      * uglify process but strings will not. Therefore by injecting the argument
//      * as strings in an array using the $inject method we can be sure angular 
//      * still knows what we want to do.
//      */
//     SigninCtrl.$inject = ['Auth', '$firebaseArray', 'firebase'];

//     /*
//      * definition of the results controller function itself. Taking 
//      * quizMetrics as an argument
//      */
//     function SigninCtrl(Auth, $firebaseArray, firebase) {
//         var vm=this;
//         vm.user = {
//             email: 'jon@hybrain.co',
//             password: '@123qweasd'
//         };

//         Auth.signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ...
//         }).then(function(res) {
//             console.log(res);
//         });


//         vm.login = function() {
//             Auth.signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//             }).then(function(res) {
//                 console.log(res);
//             });

//         }




//     }

// })();


(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("sessionCtrl", SessionCtrl);

    /*
     * injecting the [] into the lessons controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    SessionCtrl.$inject = ['Auth', '$state', '$localStorage'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function SessionCtrl(Auth, $state, $localStorage) {
        console.log('Session Controller');
        var vm = this;
        vm.errorMessages = "";
        vm.user = {
            // "email": "jon@hybrain.co",
            // "password": "@123qweasd"
        };

        // // Everytime the app redirects in signin page it will logout the login user
        // console.log('Logging out user');

        // Auth.signOut();

        vm.signin = function() {
            console.log('Signing in');
            loginWithFirebase(vm.user.email, vm.user.password);
            //   Auth.signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function (error) {
            //     // Handle Errors here.

            //     console.log("Error");
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     // ...
            // }).then(function (res) {
            //     console.log("Result");
            //     console.log(res);
            //     $state.go('app.lessons.all');

            // });

        };

        loginWithFirebase = function(email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(response) {
                    //Retrieve the account from the Firebase Database
                    var userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
                        if (accounts.exists()) {
                            accounts.forEach(function(account) {
                                //Account already exists, proceed to home.
                                firebase.database().ref('accounts/' + account.key).on('value', function(response) {
                                    var account = response.val();
                                    $localStorage.account = account;
                                });
                                $state.go('app.lessons.all');
                            });
                        }
                    });
                    $localStorage.loginProvider = "Firebase";
                    $localStorage.email = email;
                    $localStorage.password = password;
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    console.log(error);
                    vm.errorMessages = error.message;
                });
        }

        // vm.submit = function() {
        //     $state.go('app.dashboard');
        //     console.log('Signing in');
        // }


    }

})();
'use strict';

// function sessionCtrl($scope, $state) {
//     $scope.signin = function () {
//         $state.go('user.signin');
//     };
//     $scope.submit = function () {
//         $state.go('app.dashboard');
//     };

//     $scope.myInterval = 5000;
//     $scope.active = 0;
//     var slides = $scope.slides = [];
//     var currIndex = 0;

//     $scope.addSlide = function () {
//         var newWidth = 1200 + slides.length + 1;
//         slides.push({
//             image: 'http://lorempixel.com/' + newWidth + '/800',
//             id: currIndex++
//         });
//     };
//     for (var i = 0; i < 4; i++) {
//         $scope.addSlide();
//     }
// }
// angular.module('app').controller('sessionCtrl', ['$scope', '$state', sessionCtrl]);