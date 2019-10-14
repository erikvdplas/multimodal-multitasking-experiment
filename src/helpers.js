export const styled = (component, style) => {
  for (const [key, value] of Object.entries(style)) {
    component.style[key] = value;
  }

  return component;
};

export const ref = (component, handler) => handler(component);

export const OBSERVABLE_TIME = 1200;
export const REST_TIME = 400;
