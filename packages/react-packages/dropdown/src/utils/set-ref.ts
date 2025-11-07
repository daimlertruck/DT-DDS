import { MutableRefObject, Ref } from 'react';

export const setRef = <T>(target: Ref<T> | undefined, node: T) => {
  if (!target) {
    return;
  }

  if (typeof target === 'function') {
    target(node);

    return;
  }

  (target as MutableRefObject<T | null>).current = node;
};
