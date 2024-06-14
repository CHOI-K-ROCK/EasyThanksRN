export type PostDataType = {
    authorId: string;
    postId: string;

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

    content: string;

    createdAt: string;
    updatedAt: string;
};
