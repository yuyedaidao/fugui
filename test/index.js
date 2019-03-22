var fugui = require('../index');
var chai = require('chai');
describe("Fugui", function() {
    it('resolves', () => {
        return fugui({fg_debug: true}).then((value) => {
            expect(value).to.equal("成功了");
        });
    })
});