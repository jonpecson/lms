/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsEditCtrl", StudentsEditCtrl);

    /*
     * injecting the [] into the students controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    StudentsEditCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state', '$stateParams'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsEditCtrl(Auth, $firebaseArray, firebase, $state, $stateParams) {
        var vm = this;
        var id = $stateParams.id;
        //Holds the image url upload to firebase
        var imgUrl;
        console.log("Edit student controller");
        vm.errorMessages = [];
        vm.successMessages = [];



        vm.student = {};

        var ref = firebase.database().ref().child("students");
        vm.students = $firebaseArray(ref);
        vm.students.$loaded().then(function() {
            vm.student = vm.students.$getRecord(id);
        })

        vm.sections = [];

        vm.onYearLevelSelected = function() {
            console.log(vm.student.yearLevel);
            console.log("Hello World!");
            if (vm.student.yearLevel == 7) {
                vm.sections = ['Hawthorne', 'Milton', 'Bacon'];
            } else if (vm.student.yearLevel == 8) {
                vm.sections = ['Gibran', 'Twain', 'Middleton'];
            } else if (vm.student.yearLevel == 9) {
                vm.sections = ['Beckette', 'Shakespeare', 'Greenwood'];
            } else if (vm.student.yearLevel == 10) {
                vm.sections = ['Homer', 'Vreeland', 'Hemingway']
            }
        }
        vm.onYearLevelSelected();

        vm.saveStudent = function() {
            console.log(vm.student.photo);


            if (vm.student.photo.name) {
                // Create a storage reference 
                var storageRef = firebase.storage().ref();

                // Upload a file

                var uploadTask = storageRef.child('images/' + vm.student.photo.name).put(vm.student.photo);
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
                        vm.student.photo = imgUrl;
                        saveStudentData();
                    }
                )
            } else {
                saveStudentData();
            }



        }

        saveStudentData = function() {
            vm.student.displayName = vm.student.firstName + ' ' + vm.student.middleName.charAt(0) + ' ' + vm.student.lastName,
                vm.students.$save(vm.student).then(function(res) {
                    console.log(res) // true)
                    $state.go('app.students.all');
                }, function(error) {
                    console.log("Error:", error);
                });
        }

        // deprecated
        vm.resetPassword = function() {

            vm.successMessages = [];
            var msg = "A message will be sent to your address containing a link to reset your password.";
            vm.successMessages.push(msg);

            firebase.auth().sendPasswordResetEmail(vm.student.username)
                .then(function() {
                    //Shows success message.
                    console.log(msg);
                })
                .catch(function(error) {
                    vm.successMessages = [];
                    vm.errorMessages = [];

                    var errorCode = error.code;
                    //Show error message.
                    console.log(errorCode);
                    switch (errorCode) {
                        case 'auth/user-not-found':
                            vm.errorMessages.push("Email address not found.")
                            break;
                        case 'auth/invalid-email':
                            vm.errorMessages.push("Invalid email.")
                            break;
                        default:
                            vm.errorMessages.push("Error getting password reset link.")
                            break;
                    }
                });
        }


    }

})();