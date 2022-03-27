export interface Posts {
    _id: string;
    _createdAt: string;
    title: string;
    allcategories: [Category];
    author: {
        name: string;
        image: string;
    };
    comments: [Comment];
    categories: [PostCategory];
    description: string;
    mainImage: {
        assets: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _id: string;
    _type: string;
    _updatedAt: string;
}

export interface Category {
    _id: string;
    slang: string;
    description: string;
    title: string;
}
export interface PostCategory {
    _ref: string;
    _key: string;
}