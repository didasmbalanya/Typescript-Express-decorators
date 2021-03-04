import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

function routeBinder(method: string) {
  return function (path: string): any {
    return function (
      target: any,
      key: string,
      _desc: PropertyDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const put = routeBinder(Methods.PUT);
export const patch = routeBinder(Methods.PATCH);
export const del = routeBinder(Methods.DEL);
