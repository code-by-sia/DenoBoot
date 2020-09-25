// deno-lint-ignore-file
export type Component = {
  new (): any;
  name: string;
};

const components: any = new Map();
const configs: any = new Map();
const controllers: Component[] = [];
const services: Component[] = [];

function lazy(fn: Function) {
  var value: any = null;
  return function () {
    if (!value) value = fn();
    return value;
  };
}

export function lookup(fn: Component) {
  if (!!components.get(fn.name)) {
    return components.get(fn.name);
  }

  const cmp = new (<any> fn)();
  components.set(fn.name, cmp);
  return cmp;
}

export const Controller = () => (cr: Component) => controllers.push[lookup(cr)];

export const Service = () => (svc: Component) => services.push[lookup(svc)];

export const Configuration = () =>
  (config: Component) => {
    const configuration = lookup(config);
    const proto = Object.getPrototypeOf(configuration);
    const props = Object.getOwnPropertyNames(proto);
    props.forEach((prop) => {
      if (
        prop !== "constructor" &&
        typeof (configuration[prop]) === "function"
      ) {
        configs.set(prop, configuration[prop]());
      }
    });
  };

export const Value = (name: string) =>
  (target: any, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: lazy(() => configs.get(name)),
    });
  };

export const EnableConfigurations = (configs: any[]) =>
  (cfg: Component) => configs.forEach((config: any) => lookup(config));

export const Inject = (type: Component) =>
  (target: any, propertyKey: string) =>
    Object.defineProperty(target, propertyKey, {
      get: lazy(() => lookup(type)),
    });

export const Get: Function = (path: string) => Method("GET", path);
export const Post: Function = (path: string) => Method("POST", path);
export const Put: Function = (path: string) => Method("PUT", path);
export const Delete: Function = (path: string) => Method("DELETE", path);
export const Options: Function = (path: string) => Method("OPTIONS", path);
export const Patch: Function = (path: string) => Method("PATCH", path);
export const Head: Function = (path: string) => Method("HEAD", path);

const Method: Function = (method: string, path: string) =>
  (target: any, handler: string) => {
    target.endpoints = target.endpoints || [];
    target.endpoints.push({ handler, method, path });
  };
