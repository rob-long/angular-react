import { useEffect, useState } from 'react';
import AppBridge from './AppBridge';

const useAppBridge = <T>(subjectName: string) => {
  const [state, setState] = useState<T | null>(AppBridge.getValue<T>(subjectName));

  useEffect(() => {
    const subject = AppBridge.getSubject<T>(subjectName);
    const subscription = subject.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [subjectName]);

  const updateState = (newState: T) => {
    AppBridge.updateSubject(subjectName, newState);
  };

  return [state, updateState] as const;
};

export default useAppBridge;
