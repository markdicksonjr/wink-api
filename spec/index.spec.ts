import {Devices, GetDevice, GetDeviceUsers, GetGroup, Groups, SetDesiredState, ShareDevice, UnshareDevice, UpdateGroup} from "../index";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(Devices).not.toBeFalsy();
        expect(Devices.list).not.toBeFalsy();
        expect(SetDesiredState).not.toBeFalsy();
        expect(SetDesiredState.set).not.toBeFalsy();
        expect(GetDevice).not.toBeFalsy();
        expect(GetDevice.get).not.toBeFalsy();
        expect(GetDeviceUsers).not.toBeFalsy();
        expect(GetDeviceUsers.get).not.toBeFalsy();
        expect(GetGroup).not.toBeFalsy();
        expect(GetGroup.get).not.toBeFalsy();
        expect(Groups).not.toBeFalsy();
        expect(Groups.list).not.toBeFalsy();
        expect(ShareDevice).not.toBeFalsy();
        expect(ShareDevice.get).not.toBeFalsy();
        expect(UnshareDevice).not.toBeFalsy();
        expect(UnshareDevice.get).not.toBeFalsy();
        expect(UpdateGroup).not.toBeFalsy();
        expect(UpdateGroup.update).not.toBeFalsy();
        expect(UpdateGroup.updateState).not.toBeFalsy();
    });
});
