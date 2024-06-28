import { UserDataType } from '../@types/models/user';

export const SAMPLE_IMAGE =
    'https://images.unsplash.com/photo-1717496002081-38a90d3cba26?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
    id: 'post-uuid-1',
    user_id: 'user-uuid-1',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    images: [], //여러장 들어갈 수 있음.
    created_at: '2024-06-01T12:00:00Z',
    updated_at: '2024-06-01T12:00:00Z',
};

export type PostType = typeof DUMMY_POST_NONE_IMAGE;
//! 임시 타입, 정해진 후 @type 에 새로 정의

export const DUMMY_POST_MULTI_IMAGE = {
    id: 'post-uuid-1',
    user_id: 'user-uuid-1',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    images: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE],
    created_at: '2024-06-01T12:00:00Z',
    updated_at: '2024-06-01T12:00:00Z',
};

export const DUMMY_POST_SINGLE_IMAGE = {
    id: 'post-uuid-1',
    user_id: 'user-uuid-1',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    images: [SAMPLE_IMAGE],
    created_at: '2024-06-01T12:00:00Z',
    updated_at: '2024-06-01T12:00:00Z',
};
