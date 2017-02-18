/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsCtrl", LessonsCtrl);

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
    LessonsCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsCtrl(Auth, $firebaseArray, firebase, $state) {
        var vm = this;
        console.log("Lessons Controller")

        var ref = firebase.database().ref().child("lessons");
        // create a synchronized array

        console.log("Creating a lessons reference.");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded()
            .then(function () {
                console.log(vm.lessons);
            })


        // console.log(vm.lessons);
        // add new items to the array
        // the message is automatically added to our Firebase database!
        vm.lesson = {
            "title": "COMMUNICATION SKILLS: How To Make A Great First Impresion",
            "description": "This course is taught by a social skills coach with 15 years of experience\n20'000 satisfied students enrolled in my courses\n300+ TOP reviews in my courses\n30 Money Back Guarantee - You have 30 days to watch the course and decide if that's for you\nLATEST: Course Updated Again for October 2015",
            "thumbnail": "https://firebasestorage.googleapis.com/v0/b/southland-lms.appspot.com/o/images%2F603190_e33b_8.jpg?alt=media&token=9a7f743c-11ab-4905-9267-10de5e94409d",
            "content" : "<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style=\"color: blue;\">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href=\"https://github.com/fraywing/textAngular\">Here</a> </p>",
            "yearLevel" : 10
        };

        vm.login = function () {
            Auth.signInWithEmailAndPassword('jon@hybrain.co', '@123qweasd').catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            }).then(function (res) {
                console.log(res);
            });

        }

        vm.logout = function () {
            Auth.signOut();
        }

        vm.addLesson = function () {
            
            
            $state.go('app.lessons.add');
            console.log('Adding lesson');
            // vm.lessons.$loaded()
            //     .then(function () {
            //         vm.lessons.$add({
            //             title: vm.lesson.title,
            //             description: vm.lesson.description,
            //             thumbnail: vm.lesson.thumbnail
            //         }).then(function (x) {
            //             console.log(x);
            //         });
            //     });

            
        };

        vm.previewLesson = function(id) {
            $state.go('app.lessons.view', {"id":id});
        }

        vm.editLesson = function(id) {
            $state.go('app.lessons.edit', {"id":id});
        }

        vm.removeLesson = function(id) {
            var item = vm.lessons.$getRecord(id);
            vm.lessons.$remove(item);
        }

    
        

        vm.goToLesson = function (id) {
            console.log(id);

           
        }

        /*
         * The pattern used in the controllers in this app puts all the 
         * properties and methods available to the view at the top of the 
         * function. Any methods are referenced as named functions which are 
         * defined at the bottom.
         *
         * This allows the interface of the controller to be seen at a glance. 
         * Which is not usually the case when defining methods as anon 
         * functions inline.
         */


    }

})();