export type PostDataType = {
    authorId: string;
    postId: string;

    title: string;
    content: string;
    photos: string[]; // uris

    comments?: PostCommentType[];

    createdAt: string;
    updatedAt: string;
};

export type PostCommentType = {
    authorId: string;
    postId: string;
    commentId: string;

    title: string;
    content: string;

    createdAt: string;
    updatedAt: string;
};
