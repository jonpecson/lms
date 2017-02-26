/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

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
    QuizzesPreviewCtrl.$inject = ['$state', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function QuizzesPreviewCtrl($state, $firebaseArray, firebase) {
        var vm = this;
        var ref = firebase.database().ref().child("quizzes");
        vm.quizzes = $firebaseArray(ref);
        vm.quiz = {};
        vm.question = {};
        vm.questions = [];

        vm.quizzes.$loaded().then(function () {
            console.log(vm.quizzes);
        })

        // vm.question.options = [];
        vm.options = [];

        vm.saveQuiz = function () {
            var quiz = {};
            quiz.topic = vm.quiz.topic;
            quiz.passingScore = vm.quiz.passingScore;
            quiz.yearLevel = vm.quiz.yearLevel;
            quiz.questions = vm.questions;

            vm.quizzes.$loaded().then(function () {
                vm.quizzes.$add(quiz);
            })
            console.log("saving quizz");

        }

        vm.loadQuestions = function () {
            var questions = [
                {
                    id: 1,
                    title: "Where does the Kemp's Ridley Sea Turtle live?'",
                    options: [
                        {
                            answer: "Tropical waters all around the world"
                        },
                        {
                            answer: "Eastern Australia"
                        },
                        {
                            answer: "Coastal North Atlantic"
                        },
                        {
                            answer: "South pacific islands"
                        }
                    ],
                    selected: "",
                    correct: "South pacific islands"
                }, {
                    id: 2,
                    title: "Where does the Kemp's Ridley Sea Turtle live?'",
                    options: [
                        {
                            answer: "Tropical waters all around the world"
                        },
                        {
                            answer: "Eastern Australia"
                        },
                        {
                            answer: "Coastal North Atlantic"
                        },
                        {
                            answer: "South pacific islands"
                        }
                    ],
                    selected: "",
                    correct: "Eastern Australia"
                }, {
                    id: 3,
                    title: "Where does the Kemp's Ridley Sea Turtle live?'",
                    options: [
                        {
                            answer: "Tropical waters all around the world"
                        },
                        {
                            answer: "Eastern Australia"
                        },
                        {
                            answer: "Coastal North Atlantic"
                        },
                        {
                            answer: "South pacific islands"
                        }
                    ],
                    selected: "",
                    correct: "Tropical waters all around the world"
                }
            ]

            vm.quizzes.$add({ questions: questions });
        }

        vm.addOption = function () {
            console.log("Adding new option")
            vm.options.push({
                answer: "Answer " + (vm.options.length + 1)
            })
        }

        vm.correctAnswer = function (buttonIndex) {
            var name = "answer" + buttonIndex;
            // console.log(name);

            // $('#' + name).text("Correct answer");

            // var correctAnswer = $('input[type="text"][name=' + name).val();
            // console.log(correctAnswer);


            for (var i = 1; i <= vm.options.length; i++) {
                // console.log('#answer' + i, buttonIndex)
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



        vm.addQuestion = function () {
            vm.question.options = [];
            // console.log(vm.question.topic);
            // console.log(vm.question.passingScore);

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

            vm.quizzes.$add(vm.questions);
        }


    }




})();