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

    export interface IUserDevicesResponse {
        data: IDevices[];
    }

    export interface IDevices {
        object_type: string;
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
}
