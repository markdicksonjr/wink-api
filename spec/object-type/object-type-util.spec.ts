import TObjectType = WinkAPI.TObjectType;
import {ObjectTypeUtil} from "../../object-type/object-type-util";

describe('Object Type Util', () => {

    it('should add the letter s appropriately', () => {

        expect(ObjectTypeUtil.pluralizeObjectType("door_bell")).toEqual("door_bells");
        expect(ObjectTypeUtil.pluralizeObjectType("lock")).toEqual("locks");
        expect(ObjectTypeUtil.pluralizeObjectType("garage_door")).toEqual("garage_doors");
        expect(ObjectTypeUtil.pluralizeObjectType("light_bulb")).toEqual("light_bulbs");
        expect(ObjectTypeUtil.pluralizeObjectType("hub")).toEqual("hubs");
        expect(ObjectTypeUtil.pluralizeObjectType("gang")).toEqual("gangs");
        expect(ObjectTypeUtil.pluralizeObjectType("thermostat")).toEqual("thermostats");
        expect(ObjectTypeUtil.pluralizeObjectType("button")).toEqual("buttons");
        expect(ObjectTypeUtil.pluralizeObjectType("sensor_pod")).toEqual("sensor_pods");
        expect(ObjectTypeUtil.pluralizeObjectType("shade")).toEqual("shades");
        expect(ObjectTypeUtil.pluralizeObjectType("camera")).toEqual("cameras");
        expect(ObjectTypeUtil.pluralizeObjectType("eggtray")).toEqual("eggtrays");
        expect(ObjectTypeUtil.pluralizeObjectType("cloud_clock")).toEqual("cloud_clocks");
        expect(ObjectTypeUtil.pluralizeObjectType("powerstrip")).toEqual("powerstrips");
        expect(ObjectTypeUtil.pluralizeObjectType("piggy_bank")).toEqual("piggy_banks");
        expect(ObjectTypeUtil.pluralizeObjectType("refrigerator")).toEqual("refrigerators");
        expect(ObjectTypeUtil.pluralizeObjectType("propane_tank")).toEqual("propane_tanks");
        expect(ObjectTypeUtil.pluralizeObjectType("remote")).toEqual("remotes");
        expect(ObjectTypeUtil.pluralizeObjectType("siren")).toEqual("sirens");
        expect(ObjectTypeUtil.pluralizeObjectType("smoke_detector")).toEqual("smoke_detectors");
        expect(ObjectTypeUtil.pluralizeObjectType("sprinkler")).toEqual("sprinklers");
        expect(ObjectTypeUtil.pluralizeObjectType("water_heater")).toEqual("water_heaters");
    });

    it('should add the letters es appropriately', () => {
        expect(ObjectTypeUtil.pluralizeObjectType("binary_switch")).toEqual("binary_switches");
    });
});
