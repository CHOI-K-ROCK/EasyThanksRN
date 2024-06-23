import { useEffect, useRef } from 'react';

// useDelay.ts
export const useDelay = () => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId.current as NodeJS.Timeout);
        };
    }, []);

    return (ms: number, fn?: () => void) =>
        new Promise<void>(resolve => {
            timeoutId.current = setTimeout(() => {
                fn();
                resolve();
            }, ms);
        });
};

export default useDelay;
