import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList = [], // provide a default empty array
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
