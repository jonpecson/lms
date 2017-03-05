/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsAddCtrl", StudentsAddCtrl);

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
    StudentsAddCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state', '$localStorage', '$filter', '$window'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsAddCtrl(Auth, $firebaseArray, firebase, $state, $localStorage, $filter, $window) {
        var vm = this;

        var ref = firebase.database().ref().child("students");
        vm.students = $firebaseArray(ref);
        vm.students.$loaded().then(function() {
            console.log(vm.students);
        })

        vm.student = {};
        vm.sections = [];
        vm.errorMessages = [];


        vm.onYearLevelSelected = function() {
            // console.log(vm.student.yearLevel);
            // console.log("Hello World!");

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



        vm.register = function() {
            //Check if form is filled up.
            if (angular.isDefined(vm.student)) {
                // Utils.show("message", "success");
                firebase.database().ref('students').orderByChild('email').equalTo(vm.student.username).once('value').then(function(accounts) {
                    if (accounts.exists()) {
                        // Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                        vm.errorMessages = [];
                        console.log("Account already exist.")
                        var errorMessage = "Email address is already taken.";
                        vm.errorMessages.push(errorMessage);
                        return;
                    } else {
                        //Create Firebase account.
                        firebase.auth().createUserWithEmailAndPassword(vm.student.username, vm.student.password)
                            .then(function() {
                                //Holds the image url upload to firebase
                                var imgUrl;

                                // Create a storage reference 
                                var storageRef = firebase.storage().ref();
                                console.log(vm.student.photo);
                                console.log(vm.student.photo.name);
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
                                        vm.student.photo = imgUrl;
                                        // vm.students.$add(vm.student).then(function(x) {
                                        //     console.log('Adding student complete: ' + x);
                                        // });
                                        // vm.register();
                                        //Add Firebase account reference to Database. Firebase v3 Implementation.
                                        firebase.database().ref().child('students').push({
                                            usertype: 'student',
                                            username: vm.student.username,
                                            password: vm.student.password,
                                            email: vm.student.username,
                                            userId: firebase.auth().currentUser.uid,
                                            dateCreated: Date(),
                                            provider: 'Firebase',
                                            firstName: vm.student.firstName,
                                            middleName: vm.student.middleName,
                                            lastName: vm.student.lastName,
                                            gender: vm.student.gender,
                                            yearLevel: vm.student.yearLevel,
                                            mobile: vm.student.mobile,
                                            address: vm.student.address,
                                            section: vm.student.section,
                                            displayName: vm.student.firstName + ' ' + vm.student.middleName.charAt(0) + ' ' + vm.student.lastName,
                                            photo: vm.student.photo
                                        }).then(function(response) {
                                            //Account created successfully, logging user in automatically after a short delay.
                                            // Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                                            //     .then(function() {
                                            //         getAccountAndLogin(response.key);
                                            //     })
                                            //     .catch(function() {
                                            //         //User closed the prompt, proceed immediately to login.
                                            // getAccountAndLogin(response.key);


                                            // $state.go('app.students.all');
                                            //     });
                                            // $localStorage.loginProvider = "Firebase";
                                            // $localStorage.email = vm.student.username;
                                            // $localStorage.password = vm.student.password;
                                        });
                                        // $window.history.back();
                                        $state.go('app.students.all');
                                    });
                            })
                            .catch(function(error) {
                                vm.errorMessages = [];
                                var errorCode = error.code;
                                var errorMessage = error.message;

                                //Show error message.
                                console.log(errorMessage);
                                vm.errorMessages.push(errorMessage);
                                // vm.errorMessages.push(errorMessage)
                            });
                    }
                });
            }
        };




        //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
        getAccountAndLogin = function(key) {
            firebase.database().ref('students/' + key).on('value', function(response) {
                var account = response.val();
                $localStorage.account = account;
            });
            $state.go('app.students.all');
        };

    }

})();