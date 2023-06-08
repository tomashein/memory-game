declare namespace Game {
  type Card = {
    id: string;
    image: string;
    title: string;
    active: boolean;
    matched: boolean;
  };
  type Score = {
    hits: number;
    errors: number;
  };
}

declare namespace Api {
  type ContentMeta = {
    name: string;
    slug: string;
    tags: string[];
    type: string;
    uuid: string;
    space: string;
    author: object;
    locale: string;
    excerpt: string;
    private: boolean;
    targets: string[];
    category: null | string;
    created_at: string;
    updated_at: string;
    published_at: string;
    version_type: string;
    category_name: null | string;
    category_slug: null | string;
    unpublished_at: null | string;
    available_locales: string[];
  };
  type ImageField = {
    url: string;
    tags: string[];
    uuid: string;
    title: string;
    alt_text: null | string;
    description: null | string;
    content_type: string;
  };
  type ContentFields = {
    image?: ImageField;
  };
  type Content = {
    meta: ContentMeta;
    fields: ContentFields;
  };
  type PaginationMeta = {
    total_entries: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
  type PaginatedResponse = {
    entries: Content[];
    meta: PaginationMeta;
  };
}
