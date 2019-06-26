import dsbridge from 'dsbridge'
import Fugui from './core/Fugui'
import {bind, extend} from './core/utils'

function createInstance(bridge, config) {
    var context = new Fugui(bridge, config);
    var instance = bind(Fugui.prototype.request, context);
    extend(instance, Fugui.prototype, context);
    extend(instance, context);
    return instance;
}
// Create the default instance to be exported

var fugui = createInstance(dsbridge, {});
fugui.create = function create(instanceConfig) {
    return createInstance(dsbridge, instanceConfig);
};
export default fugui;