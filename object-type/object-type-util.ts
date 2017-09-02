export class ObjectTypeUtil {

    public static pluralizeObjectType(type: WinkAPI.TObjectType) {
        if(type === 'binary_switch') {
            return type + 'es';
        }
        return type + 's';
    }
}