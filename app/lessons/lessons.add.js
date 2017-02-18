/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsAddCtrl", LessonsAddCtrl);

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
    LessonsAddCtrl.$inject = ['$firebaseArray', 'firebase', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsAddCtrl($firebaseArray, firebase, $state) {
        var vm = this;
        vm.lesson = {};
        console.log("Lessons Add Controller")

        var ref = firebase.database().ref().child("lessons");

        // create a synchronized array
        console.log("Creating a lessons reference.");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded().then(function () {
            console.log(vm.lessons);
        })



        vm.validationOpt = {
            rules: {
                email: {
                    required: true,
                    // email: true,
                    minlength: 3
                },
                desc: {
                    required: true,
                    minlength: 10
                },
                passwordfield: {
                    required: true,
                    minlength: 6
                },
                cpasswordfield: {
                    required: true,
                    minlength: 6,
                    equalTo: '#passwordfield'
                },
                description: {
                    required: true
                },
                number: {
                    required: true
                },
                name: {
                    required: true
                },
                expiry: {
                    required: true
                },
                cvc: {
                    required: true
                }
            }
        };

        vm.lesson.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
        vm.text = 'Hello World';
        vm.opt1 = {
            toolbar: {
                fa: true
            }
        };

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
                            console.log(vm.lessons);
                            console.log(vm.lesson);

                            vm.lessons.$loaded().then(function () {
                                vm.lessons.$add({
                                    title: vm.lesson.title,
                                    description: vm.lesson.description,
                                    thumbnail: imgUrl,
                                    yearLevel: vm.lesson.yearLevel,
                                    content: vm.lesson.content
                                }).then(function (x) {
                                    console.log('Adding lesson complete: ' + x);
                                });
                            })
                        }
                    )

                    // vm.lessons.$loaded()
                    //     .then(function () {
                    //         vm.lessons.$add({
                    //             title: vm.lesson.title,
                    //             description: vm.lesson.description,
                    //             thumbnail: imgUrl,
                    //             yearLevel: vm.lesson.yearLevel,
                    //             content: vm.lesson.htmlContent
                    //         }).then(function (x) {
                    //             console.log(x);
                    //         });
                    //     })

                    //  vm.lessons.$loaded()
                    // .then(function () {
                    // vm.lessons.$add({
                    //     title: 'Learn Java Programming For Beginners',
                    //     description: 'A Complete Solution To Learn Java Programming By Mastering Its Basic And Advanced Topics',
                    //     thumbnail: 'https://udemy-images.udemy.com/course/750x422/912368_859b_3.jpg',
                    //     yearLevel: 'Grade 7',
                    //     content: vm.lesson.htmlContent
                    // }).then(function (x) {
                    //     console.log(x);
                    // });
                    // })
                }

            },
            onTabClick: function () {
                return false;
            }
        };


    }

})();