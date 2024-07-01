import { useRecoilState } from 'recoil';
import { isLoadingAtom } from '../recoil/ui';

const useLoading = () => {
    const [isLoading, setLoading] = useRecoilState(isLoadingAtom);

    return {
        isLoading,
        setLoading,
    };
};

export default useLoading;
