/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("quizzesCtrl", QuizzesCtrl);

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
    QuizzesCtrl.$inject = ['$state', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function QuizzesCtrl($state, $firebaseArray, firebase) {
        var vm = this;
        // var ref = firebase.database().ref().child("students");

        var id = 0;
        vm.inProgress = true;
        vm.quizOver = false;
        vm.score = 0;
        var endOfQuiz = false;

        var questions = [
            {
                question: "Which is the largest country in the world by population?",
                options: ["India", "USA", "China", "Russia"],
                answer: 2
            },
            {
                question: "When did the second world war end?",
                options: ["1945", "1939", "1944", "1942"],
                answer: 0
            },
            {
                question: "Which was the first country to issue paper currency?",
                options: ["USA", "France", "Italy", "China"],
                answer: 3
            },
            {
                question: "Which city hosted the 1996 Summer Olympics?",
                options: ["Atlanta", "Sydney", "Athens", "Beijing"],
                answer: 0
            },
            {
                question: "Who invented telephone?",
                options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
                answer: 1
            }]

        vm.question = questions[id];
        vm.answerMode = true;
        console.log(vm.question);



        // vm.getQuestion = function (id) {
        //     if (id < questions.length) {
        //         vm.question = questions[id];
        //         vm.options = vm.question.options;
        //         vm.answer = vm.question.answer;
        //         vm.answerMode = true;
        //     } else {
        //         return false;
        //     }
        // };

        vm.checkResult = function () {
            var r = 0;
            questions.forEach(function (q) {
                if (q.selectedAnswer == q.options[q.answer]) {
                    r++;
                    console.log("Result: " + r);
                }
            })
        }




        vm.checkAnswer = function () {
            console.log("Question #" + id);
            if (!$('input[name=answer]:checked').length) return;

            // get the selected answer
            var ans = $('input[name=answer]:checked').val();

            // save the answer
            questions[id].selectedAnswer = ans;

            console.log(questions[id].selectedAnswer);
            vm.nextQuestion();





            // console.log(vm.question.answer);
            // console.log(ans, vm.question.options[vm.question.answer]);

            // console.log("Question ", id + 1, "of ", questions.length);
            // check if answer is equal to actual answer
            // if (ans == vm.question.options[vm.question.answer]) {

            //     // console.log("End of quiz: " + endOfQuiz);
            //     if (id < questions.length && endOfQuiz == false) {
            //         // console.log("Add score");
            //         vm.score++;
            //     }

            //     if ((id+1) == questions.length) {
            //         endOfQuiz = true;
            //         // console.log("End of quiz: " + endOfQuiz);
            //     }

            //     vm.correctAns = true;
            // } else {
            //     vm.correctAns = false;
            // }
            // console.log("Score: " + vm.score);




        };

        vm.nextQuestion = function () {
            if (id < questions.length - 1 && endOfQuiz == false) {
                id++;
                vm.question = questions[id];
            }
        }

        vm.prevQuestion = function () {
            if (id > 0) {
                id--;
                vm.question = questions[id];
                console.log(id, questions.length - 1);
                // get the selected answer
                var ans = $('input[name=answer]:checked').val();

                // save the answer
                questions[id].selectedAnswer = ans;
            }
            endOfQuiz == false;
        }



    }

})();