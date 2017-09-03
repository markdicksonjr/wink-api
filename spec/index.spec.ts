import {Devices, GetDevice, GetDeviceUsers, Groups, SetDesiredState, ShareDevice, UnshareDevice} from "../index";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(Devices).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
        expect(GetDevice).not.toBeFalsy();
        expect(GetDeviceUsers).not.toBeFalsy();
        expect(Groups).not.toBeFalsy();
        expect(ShareDevice).not.toBeFalsy();
        expect(UnshareDevice).not.toBeFalsy();
    });
});
