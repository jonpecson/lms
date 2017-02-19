/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsEditCtrl", LessonsEditCtrl);

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
    LessonsEditCtrl.$inject = ['$firebaseArray', 'firebase', '$state', '$stateParams'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsEditCtrl($firebaseArray, firebase, $state, $stateParams) {
        var vm = this;
        var id = $stateParams.id;
        vm.lesson = {};

        // console.log(id);

        var ref = firebase.database().ref().child("lessons");

        // create a synchronized array
        // console.log("Creating a lessons reference.");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded()
            .then(function () {
                console.log(vm.lessons);
                vm.lesson = vm.lessons.$getRecord(id);
                console.log(vm.lesson);
            })

        vm.goBack = function () {
            $state.go('app.lessons.all');
        }


        var page = 1;
        vm.wizardOpt = {
            tabClass: '',
            'nextSelector': '.button-next',
            'previousSelector': '.button-previous',
            'firstSelector': '.button-first',
            'lastSelector': '.button-last',
            onNext: function () {
                page = page + 1;
                var $valid = angular.element('#wizardForm').valid(),
                    $validator;
                if (!$valid) {
                    //$validator.focusInvalid();
                    return false;
                }

                // Save the lesson in lastpage
                if (page === 4) {

                    //Holds the image url upload to firebase
                    var imgUrl;

                    // Create a storage reference 
                    var storageRef = firebase.storage().ref();

                    // Upload a file
                    var uploadTask = storageRef.child('images/' + vm.lesson.thumbnail.name).put(vm.lesson.thumbnail);
                    uploadTask.on('state_changed',

                        function progress(snapshot) {
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(percentage);
                        },

                        function error(err) {
                            console.log(err);
                        },

                        function complete() {
                            imgUrl = uploadTask.snapshot.downloadURL;
                            console.log('Upload complete: ' + imgUrl);
                            vm.lesson.thumbnail = imgUrl;
                            vm.lessons.$save(vm.lesson).then(function (res) {
                                console.log(res) // true)
                            }, function (error) {
                                console.log("Error:", error);
                            });
                        }
                    )
                }

            },
            onTabClick: function () {
                return false;
            }
        };


    }

})();