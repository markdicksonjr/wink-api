import {
    ActivateScene,
    CreateUser,
    GetDevices,
    GetDevice,
    GetDeviceUsers,
    GetGroup,
    GetGroups,
    GetRobots,
    GetScene,
    GetScenes,
    SetDesiredState,
    ShareDevice,
    UnshareDevice,
    UpdateGroup,
    UpdateGroupState,
    UpdateUser
} from "../index";

describe('Module index', () => {

    it('should expose the expected modules', () => {
        expect(ActivateScene).not.toBeFalsy();
        expect(ActivateScene.execute).not.toBeFalsy();
        expect(CreateUser).not.toBeFalsy();
        expect(CreateUser.execute).not.toBeFalsy();
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
        expect(GetRobots).not.toBeFalsy();
        expect(GetRobots.execute).not.toBeFalsy();
        expect(GetScene).not.toBeFalsy();
        expect(GetScene.execute).not.toBeFalsy();
        expect(GetScenes).not.toBeFalsy();
        expect(GetScenes.execute).not.toBeFalsy();
        expect(ShareDevice).not.toBeFalsy();
        expect(ShareDevice.execute).not.toBeFalsy();
        expect(UnshareDevice).not.toBeFalsy();
        expect(UnshareDevice.execute).not.toBeFalsy();
        expect(UpdateGroup).not.toBeFalsy();
        expect(UpdateGroup.execute).not.toBeFalsy();
        expect(UpdateGroupState.execute).not.toBeFalsy();
        expect(UpdateUser).not.toBeFalsy();
        expect(UpdateUser.execute).not.toBeFalsy();
    });
});
