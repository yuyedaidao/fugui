import fugui from '../index'
import mergeConfig from '../src/core/merge'

var chai = require('chai');
var expect = chai.expect;

const http = fugui.create({
    baseURL: "",
    scheme: "topic"
});

const config = mergeConfig({}, {headers: {}});
console.log(config)