'use strict';
angular.module('app').controller('AppCtrl', ['$scope', '$http', '$localStorage', '$timeout', '$translate', 'firebase',
    function AppCtrl($scope, $http, $localStorage, $timeout, $translate, firebase) {
        $scope.mobileView = 767;
        $scope.app = {
            name: 'LMS',
            year: (new Date()).getFullYear(),
            layout: {
                isSmallSidebar: false,
                isChatOpen: false,
                isFixedHeader: true,
                isFixedFooter: false,
                isBoxed: false,
                isStaticSidebar: false,
                isRightSidebar: false,
                isOffscreenOpen: false,
                isConversationOpen: false,
                isQuickLaunch: false,
                sidebarTheme: '',
                headerTheme: ''
            },
            isMessageOpen: false,
            isContactOpen: false,
            isConfigOpen: false
        };

        $scope.user = {
            fname: 'Sean',
            lname: 'Carpenter',
            jobDesc: 'Human Resources Guy',
            avatar: 'images/avatar.jpg',
        };

        $scope.logout = function() {
            console.log("Signing out");
            var account = {
                usertype: 'student'
            }
            $localStorage.account = account;
            firebase.auth().signOut();
        }

        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;
        } else {
            $localStorage.layout = $scope.app.layout;
        }

        $scope.$watch('app.layout', function() {
            $localStorage.layout = $scope.app.layout;
        }, true);

        $scope.$on('$viewContentLoaded', function() {
            angular.element('.pageload').fadeOut(1500);
            $timeout(function() {
                angular.element('body').removeClass('page-loading');
            }, 2000);
        });

        $scope.getRandomArbitrary = function() {
            return Math.round(Math.random() * 100);
        };

        $scope.setLang = function(langKey) {
            $translate.use(langKey);
        };

        $scope.searchFocus = false;
        $scope.focusOn = function() {
            $scope.searchFocus = true;
        };
        $scope.focusOff = function() {
            $timeout(function() {
                $scope.searchFocus = false;
            }, 100);
        };
    }
]);