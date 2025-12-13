import { createRef } from 'react';

import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  it('should handle function refs', () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const node = document.createElement('div');

    const mergedRef = mergeRefs(ref1, ref2);
    mergedRef(node);

    expect(ref1).toHaveBeenCalledWith(node);
    expect(ref2).toHaveBeenCalledWith(node);
  });

  it('should handle object refs', () => {
    const ref1 = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const node = document.createElement('div');

    const mergedRef = mergeRefs(ref1, ref2);
    mergedRef(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it('should handle mixed ref types', () => {
    const functionRef = jest.fn();
    const objectRef = createRef<HTMLDivElement>();
    const node = document.createElement('div');

    const mergedRef = mergeRefs(functionRef, objectRef);
    mergedRef(node);

    expect(functionRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
  });

  it('should skip undefined refs', () => {
    const ref = jest.fn();
    const node = document.createElement('div');

    const mergedRef = mergeRefs(ref, undefined, null);
    mergedRef(node);

    expect(ref).toHaveBeenCalledWith(node);
  });
});
