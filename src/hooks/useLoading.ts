import { useAtom } from 'jotai';
import { isLoadingAtom } from '../state/ui';

const useLoading = () => {
    const [isLoading, setLoading] = useAtom(isLoadingAtom);

    return {
        isLoading,
        setLoading,
    };
};

export default useLoading;
