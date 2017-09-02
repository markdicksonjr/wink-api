import {Devices, SetDesiredState} from "../index";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(Devices).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
    });
});
