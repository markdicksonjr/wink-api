import {GetDevices, GetDevice, GetDeviceUsers, GetGroup, GetGroups, SetDesiredState, ShareDevice, UnshareDevice, UpdateGroup, UpdateGroupState} from "../index";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(GetDevices).not.toBeFalsy();
        expect(GetDevices.execute).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
        expect(SetDesiredState.execute).not.toBeFalsy();
        expect(GetDevice).not.toBeFalsy();
        expect(GetDevice.execute).not.toBeFalsy();
        expect(GetDeviceUsers).not.toBeFalsy();
        expect(GetDeviceUsers.execute).not.toBeFalsy();
        expect(GetGroup).not.toBeFalsy();
        expect(GetGroup.execute).not.toBeFalsy();
        expect(GetGroups).not.toBeFalsy();
        expect(GetGroups.execute).not.toBeFalsy();
        expect(ShareDevice).not.toBeFalsy();
        expect(ShareDevice.execute).not.toBeFalsy();
        expect(UnshareDevice).not.toBeFalsy();
        expect(UnshareDevice.execute).not.toBeFalsy();
        expect(UpdateGroup).not.toBeFalsy();
        expect(UpdateGroup.execute).not.toBeFalsy();
        expect(UpdateGroupState.execute).not.toBeFalsy();
    });
});
