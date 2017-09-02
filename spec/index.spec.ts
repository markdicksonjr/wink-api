import {Devices, SetDesiredState} from "../index";
import {GetDevice} from "../device-type/get-device";
import {GetDeviceUsers} from "../device-type/get-device-users";
import {ShareDevice} from "../device-type/share-device";
import {UnshareDevice} from "../device-type/unshare-device";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(Devices).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
        expect(GetDevice).not.toBeFalsy();
        expect(GetDeviceUsers).not.toBeFalsy();
        expect(ShareDevice).not.toBeFalsy();
        expect(UnshareDevice).not.toBeFalsy();
    });
});
