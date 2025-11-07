import { setRef } from '.';

describe('setRef', () => {
  it('should return undefined if no target is provided', () => {
    const fn = setRef(undefined, 'node');

    expect(fn).toBeUndefined();
  });

  it('should call callback ref with the node', () => {
    const callback = jest.fn();
    const el = document.createElement('div');

    setRef<HTMLDivElement>(callback, el);

    expect(callback).toHaveBeenCalledWith(el);
  });

  it('should set current object key on a RefObject', () => {
    const objRef = {
      current: null,
    };
    const el = document.createElement('div');

    setRef<HTMLDivElement>(objRef, el);

    expect(objRef.current).toBe(el);
  });
});
