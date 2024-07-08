import { UserDataType } from '../@types/models/user';

export const SAMPLE_IMAGE =
    'https://photos.unsplash.com/photo-1717496002081-38a90d3cba26?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const DUMMY_PROFILE: UserDataType = {
    id: 'testuserid',
    ssoProvider: 'google', // kakao, naver, google
    email: 'chl4842@gmail.com',
    username: 'KROCK',
    profileImg: SAMPLE_IMAGE,
    createdAt: '2024-06-01T05:25:16.645Z',
    updatedAt: '2024-06-06T05:25:16.645Z',
};

export const DUMMY_POST_NONE_IMAGE = {
    postId: 'post-uuid-1',
    authorId: 'user-uuid-1',

    title: 'My First Post',
    content: 'This is the content of my first post.',
    photos: [], //여러장 들어갈 수 있음.

    createdAt: '2024-06-01T12:00:00Z',
    updatedAt: '2024-06-01T12:00:00Z',
};

export type PostType = typeof DUMMY_POST_NONE_IMAGE;
//! 임시 타입, 정해진 후 @type 에 새로 정의

export const DUMMY_POST_MULTI_IMAGE = {
    postId: 'post-uuid-2',
    authorId: 'user-uuid-2',

    title: 'My Second Post',
    content: 'This is the content of my second post.',
    photos: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],

    createdAt: '2024-06-01T12:00:00Z',
    updatedAt: '2024-06-01T12:00:00Z',
};

export const DUMMY_POST_SINGLE_IMAGE = {
    postId: 'post-uuid-3',
    authorId: 'user-uuid-3',

    title: 'My Third Post',
    content: 'This is the content of my third post.',
    photos: [SAMPLE_IMAGE],

    createdAt: '2024-06-01T12:00:00Z',
    updatedAt: '2024-06-01T12:00:00Z',
};
