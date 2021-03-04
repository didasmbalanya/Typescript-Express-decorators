import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function bodyValidator(...keys: string[]):Function {
  return function (target: any, key: string, _desc: PropertyDecorator) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
  };
}
