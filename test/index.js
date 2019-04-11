import fugui from '../index'

var chai = require('chai');
var expect = chai.expect;

const http = fugui.create({
    baseURL: "",
    scheme: "topic"
});

describe("Fugui", function() {
    it('resolves', () => {
        return http({
            params: {fg_debug: true}
        }).then((value) => {
            chai.expect(value).to.equal("您的测试预期返回成功，返回成功");
        });
    })
});