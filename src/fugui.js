import dsbridge from 'dsbridge'
import Fugui from './core/Fugui'
import {bind, extend} from './core/uitls'

function createInstance(bridge) {
    var context = new Fugui(bridge);
    var instance = bind(Fugui.prototype.request, context);
    extend(instance, Fugui.prototype, context);
    extend(instance, context);
    return instance;
}
// Create the default instance to be exported
var fugui = createInstance(dsbridge);
export default fugui;