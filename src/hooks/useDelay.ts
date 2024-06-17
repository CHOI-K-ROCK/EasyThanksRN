import { useRef } from 'react';

// useDelay.ts
export const useDelay = (ms: number) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const promise = () =>
        new Promise<void>(resolve => {
            timeoutId.current = setTimeout(resolve, ms);
        });

    return { promise, timeoutId: timeoutId.current };
};

export default useDelay;
