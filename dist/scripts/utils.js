angular.module('app').factory('Utils', function(message, type) {
    var promise;
    var Utils = {
        show: function() {
            noty({
                theme: 'app-noty',
                text: msg,
                type: type,
                timeout: 3000,
                layout: position,
                closeWith: ['button', 'click'],
                animation: {
                    open: 'in',
                    close: 'out'
                },
            });
        }
    };
    return Utils;
});