export interface Posts {
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
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