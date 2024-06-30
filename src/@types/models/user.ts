export type SsoProviderType = 'google' | 'naver' | 'kakao';

export type UserDataType = {
    id?: string; // 서버에서 생성해서 넘겨줘야함.
    email?: string;

    username: string | null;
    profileImg: string | null;

    ssoProvider: SsoProviderType;

    createdAt?: string;
    updatedAt?: string;
};

export type UserEditDataType = {
    id: string; // 서버에서 생성해서 넘겨줘야함.
    email?: string;

    username: string;
    profileImg: string | null;

    ssoProvider: SsoProviderType;

    createdAt?: string;
    updatedAt?: string;
};

// 각 sso 에서 전달받은 idToken 이용 서버로 회원가입 요청 전송
// idToken로 전송,서버 상에서 해당 sso provider 에 해당 토큰의 유효성 검증
// 유효한 경우 해당 아이디를 이용, 회원 생성 / 반환,
// 이미 서버에 등록된 회원인 경우 이미 존재하는 id 리턴
