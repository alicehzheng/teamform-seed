describe('MainCtrl', function() {
    var scope, createController;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function() {
            return $controller('displayEventCtrl', {
                '$scope': scope
            });
        };
    }));

    it('will it blend?', function() {
        var controller = createController();
    });

});