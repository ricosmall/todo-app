import { useEffect, useState } from 'react';
import Bloc from './presentation/bloc';

export const useBlocState = <T>(bloc: Bloc<T>) => {
  const [state, setState] = useState<T>(bloc.state);

  useEffect(() => {
    const update = (state: T) => setState(state);

    bloc.subscribe(update);

    return () => bloc.unsubscribe(update);
  }, [bloc]);

  return state;
};
