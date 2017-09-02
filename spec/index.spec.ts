import {Devices, SetDesiredState} from "../index";
import {GetDevice} from "../object-type/get-device";
import {GetDeviceUsers} from "../object-type/get-device-users";
import {ShareDevice} from "../object-type/share-device";
import {UnshareDevice} from "../object-type/unshare-device";

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
