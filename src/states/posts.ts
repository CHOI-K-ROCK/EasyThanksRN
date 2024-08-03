import { atom, selector, selectorFamily } from 'recoil';
import { PostDataType } from 'types/models/compose';

// 오늘 작성한 게시글
export const todayPostAtom = atom<{ [id: string]: PostDataType }>({
    key: 'todayPostAtom',
    default: {},
});

export const postByIdSelector = selectorFamily({
    key: 'postByIdSelector',
    get:
        (id: string) =>
            ({ get }) => {
                const todayPost = get(todayPostAtom);
                return todayPost[id];
            },
});
