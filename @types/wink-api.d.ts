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
    }

    export interface IResponse {
        errors?: string[];
        pagination?: IPagination;
    }

    export interface IPagination {
        count: number;
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

    export interface IGroup {
        group_id: string;
        name: string;
        order: number;
        icon_id: string;
        members: IGroupMember[];
        reading_aggregation: any;
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

    export interface IUser {
        device_id: string;
        user_id: string;
        email: string;
        permissions: string[];
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
}
