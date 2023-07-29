export type CreateBlog = {
    title: string,
    content : string,
    tags?: string[]
}

export type UpdateBlog = Partial<CreateBlog>;

