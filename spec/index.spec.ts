import {Devices, SetDesiredState} from "../index";
import {GetDevice} from "../device-type/get-device";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(Devices).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
        expect(GetDevice).not.toBeFalsy();
    });
});
