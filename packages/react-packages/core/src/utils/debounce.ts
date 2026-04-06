/* eslint-disable @typescript-eslint/no-explicit-any */

const debounce = (fn: (a: any) => any, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

export default debounce;
