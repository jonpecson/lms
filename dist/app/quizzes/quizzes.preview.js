/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("quizzesPreviewCtrl", QuizzesPreviewCtrl);

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
    QuizzesPreviewCtrl.$inject = ['$state', '$firebaseArray', 'firebase', '$stateParams'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function QuizzesPreviewCtrl($state, $firebaseArray, firebase, $stateParams) {
        var id = $stateParams.id;
        var vm = this;
        vm.totalScore = 0;
        vm.class = "";
        // vm.showTotal = false;

        var ref = firebase.database().ref().child("quizzes");
        vm.quizzes = $firebaseArray(ref);

        vm.quiz = {};

        vm.question = {};

        vm.questions = [];
        vm.showResult = false;

        vm.quizzes.$loaded().then(function() {
            console.log(vm.quizzes);
            // var id = "-KdsIOWJGHic1pc9Z5HU";
            vm.quiz = vm.quizzes.$getRecord(id);
            console.log(vm.quiz);
        })

        // vm.question.options = [];
        vm.options = [];

        vm.saveQuiz = function() {
            var quiz = {};
            quiz.topic = vm.quiz.topic;
            quiz.passingScore = vm.quiz.passingScore;
            quiz.yearLevel = vm.quiz.yearLevel;
            quiz.questions = vm.questions;
            vm.quizzes.$loaded().then(function() {
                vm.quizzes.$add(quiz);
            })
            console.log("saving quiz");

        }



        vm.addOption = function() {
            console.log("Adding new option")
            vm.options.push({
                answer: "Answer " + (vm.options.length + 1)
            })
        }

        vm.correctAnswer = function(buttonIndex) {

            var name = "answer" + buttonIndex;
            for (var i = 1; i <= vm.options.length; i++) {
                if (i == buttonIndex) {
                    $('#answer' + i).removeClass("btn-danger");
                    $('#answer' + i).addClass("btn-success");
                    $('#answer' + i).text("Correct answer");
                } else {
                    $('#answer' + i).removeClass("btn-success");
                    $('#answer' + i).addClass("btn-danger");
                    $('#answer' + i).text("Wrong answer");
                }
            }

            vm.question.correct = $('input[type="text"][name=' + name).val();
        }



        vm.addQuestion = function() {
            vm.question.options = [];
            console.log(vm.question.title);
            console.log(vm.question.correct);
            vm.question.selected = "";

            for (var i = 1; i <= vm.options.length; i++) {
                var n = "answer" + i;
                console.log($('input[type="text"][name=' + n).val());
                vm.question.options.push({
                    answer: $('input[type="text"][name=' + n).val()
                })
            }
            vm.questions.push(vm.question);
            vm.question = {}; // reset the question
            vm.options = [];
            // vm.quizzes.$add(vm.questions);
        }

        vm.checkResult = function() {
            var score = 0;
            vm.showResult = true;

            vm.quiz.questions.forEach(function(q) {
                console.log(q)
                if (q.selected == q.correct) {
                    score = score + 1;
                }
            }, this);

            vm.totalScore = score;

            console.log("Quiz title: " + vm.quiz.topic);
            console.log("Name: John Smith")
            console.log("You got " + score + " points");

            if (score < vm.quiz.passingScore) {
                vm.class = "text-danger";
                console.log("You failed. Please take the quiz again.");
            } else {
                vm.class = "text-success";
                console.log("Congratulations. You passed the exam");
            }



        }


        // vm.loadQuestions = function() {
        //     console.log("Loading questions");
        //     var questions = [{
        //         id: 1,
        //         title: "Where does the Kemp's Ridley Sea Turtle live?'",
        //         options: [{
        //                 answer: "Tropical waters all around the world"
        //             },
        //             {
        //                 answer: "Eastern Australia"
        //             },
        //             {
        //                 answer: "Coastal North Atlantic"
        //             },
        //             {
        //                 answer: "South pacific islands"
        //             }
        //         ],
        //         selected: "",
        //         correct: "South pacific islands"
        //     }, {
        //         id: 2,
        //         title: "Where does the Kemp's Ridley Sea Turtle live?'",
        //         options: [{
        //                 answer: "Tropical waters all around the world"
        //             },
        //             {
        //                 answer: "Eastern Australia"
        //             },
        //             {

        //                 answer: "Coastal North Atlantic"
        //             },
        //             {
        //                 answer: "South pacific islands"
        //             }
        //         ],
        //         selected: "",
        //         correct: "Eastern Australia"
        //     }, {
        //         id: 3,
        //         title: "Where does the Kemp's Ridley Sea Turtle live?'",
        //         options: [{
        //                 answer: "Tropical waters all around the world"
        //             },
        //             {
        //                 answer: "Eastern Australia"
        //             },
        //             {
        //                 answer: "Coastal North Atlantic"
        //             },
        //             {
        //                 answer: "South pacific islands"
        //             }
        //         ],
        //         selected: "",
        //         correct: "Tropical waters all around the world"
        //     }]

        //     vm.quizzes.push({
        //         topic: "General Knowledge",
        //         passingScore: 2,
        //         yearLevel: 'Grade 10',
        //         questions: questions
        //     });

        //     vm.quiz = vm.quizzes[0];
        // }


    }




})();