declare module WinkAPI {

    export interface ITokenRequestParameters {
        client_secret: string;
        grant_type: string;
        code: string;
    }

    export interface ITokenResponseParameters {
        access_token: string;
        refresh_token: string;
        token_endpoint: string;
        token_type: string;
    }

    export interface IResponse {
        errors?: string[];
        pagination?: IPagination;
    }

    export interface IPagination {
        count: number;
    }

    export interface IRequestError {
        statusCode: number;
        message: string;
    }

    export interface IUserDevicesResponse extends IResponse {
        data: IDevice[];
    }

    export interface IUserDeviceResponse extends IResponse {
        data: IDevice;
    }

    export interface IUserGroupsResponse extends IResponse {
        data: IGroup[];
    }

    export interface IUserGroupResponse extends IResponse {
        data: IGroup;
    }

    export interface IUserScenesResponse extends IResponse {
        data: IScene[];
    }

    export interface IUserSceneResponse extends IResponse {
        data: IScene;
    }

    export interface IUserRobotsResponse extends IResponse {
        data: IRobot[];
    }

    export interface IUserResponse extends IResponse {
        data: IUser;
    }

    export interface IGroup {
        group_id: string;
        name: string;
        order: number;
        icon_id: string;
        members: IGroupMember[];
        reading_aggregation: IReadingAggregation;
        automation_mode: string;
        hidden_at: number;
        object_type: "group",
        object_id: string;
        icon_code: string;
        subscription: ISubscriptionInfo;
    }

    export interface IGroupMember {
        object_type: TObjectType;
        object_id: string;
        local_id: string;
        hub_id: string;
        blacklisted_readings: any[];
    }

    export interface IScene {
        scene_id: string;
        name: string;
        members: IGroupMember[];
    }

    export type TObjectType =
        "binary_switch" |
        "door_bell" |
        "lock" |
        "garage_door" |
        "light_bulb" |
        "hub" |
        "gang" |
        "thermostat" |
        "button" |
        "sensor_pod" |
        "shade" |
        "camera" |
        "eggtray" |
        "cloud_clock" |
        "powerstrip" |
        "piggy_bank" |
        "refrigerator" |
        "propane_tank" |
        "remote" |
        "siren" |
        "smoke_detector" |
        "sprinkler" |
        "water_heater" |
        string;

    export interface IDevice {
        object_type: TObjectType;
        object_id: string;
        uuid: string;
        icon_id: string;
        icon_code: string;
        desired_state: any;
        last_reading: any;
        subscription: ISubscriptionInfo;
        hub_id: string;
        name: string;
        locale: string;
        units: any;
        created_at: number;
        hidden_at: number;
        capabilities: any; // e.g. (fields: any[], supports_ble: boolean, oauth2_clients, home_security_device, needs_wifi_network_list)
        triggers: any[]; // TODO: confirm - may be string
        manufacturer_device_model: string;
        manufacturer_device_id: string;
        device_manufacturer: string;
        model_name: string;
        upc_id: string;
        upc_code: string;
        primary_upc_code: string;
        linked_service_id: string;
        lat_lng: number[];
        location: string;
        update_needed: boolean;
    }

    export interface ISubscriptionInfo {
        pubnub: IPubNubInfo;
    }

    export interface IPubNubInfo {
        subscribe_key: string;
        key: string;
    }

    export interface IDeviceUser {
        device_id: string;
        user_id: string;
        email: string;
        permissions: string[];
    }

    export interface IRobot {
        name: string;
        creating_actor_type: "user" | string;
        creating_actor_id: string;
        automation_mode: string;
        causes: any[]; // TODO: expand
        restrictions: any[]; // TODO: expand
        effects: any[]; // TODO: expand
        last_reading: any; // TODO: expand
    }

    export interface IUser {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        oauth2: ITokenResponseParameters,
        locale: string;
        units: any, // TODO: expand
        tos_accepted: boolean;
        confirmed: boolean;
    }

    export interface IReadingAggregation {
        brightness: IAggregatedValue;
        connection: IAggregatedValue;
        firmware_date_code: IAggregatedMode;
        firmware_version: IAggregatedMode;
        powered: IAggregatedValue;
        powering_mode: IAggregatedMode;
    }

    export interface IAggregatedValue {
        and: boolean;
        changed_at: number;
        false_count: number;
        or: boolean;
        true_count: number;
        updated_at: number;
    }

    export interface IAggregatedMode {
        changed_at: number;
        mode: string;
        mode_count: number;
        other_count: number;
        updated_at: number;
    }

    export interface IAuthenticatedRequestParameters {
        host: "https://api.wink.com" | string;
        access_token: string
    }

    export interface IObjectIdRequestParameters extends IAuthenticatedRequestParameters {
        object_id: string;
        object_type: string;
    }

    export interface IGroupIdRequestParameters extends IAuthenticatedRequestParameters {
        group_id: string;
    }

    export interface ISceneIdRequestParameters extends IAuthenticatedRequestParameters {
        scene_id: string;
    }

    export interface IRobotIdRequestParameters extends IAuthenticatedRequestParameters {
        robot_id: string;
    }

    export interface ICreateUserRequestParameters extends IAuthenticatedRequestParameters {
        client_id: string;
        client_secret: string;
        email: string;
        first_name: string;
        last_name: string;
        locale: string; // e.g. "en_us",
        new_password: string;
    }

    export interface IUserRequestParameters extends IAuthenticatedRequestParameters {
        user_id: string;
    }

    export interface IUpdateUserRequestParameters extends IUserRequestParameters {
        email: string;
    }

    export interface IError {
        statusCode: number;
        message: string;
    }
}
