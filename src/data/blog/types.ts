export type BlogPostStatus = "published" | "draft" | "scheduled";

export type BlogContentBlock =
  | {
      type: "heading";
      id: string;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
      cite?: string;
    }
  | {
      type: "list";
      title?: string;
      items: string[];
    }
  | {
      type: "metric";
      label: string;
      value: string;
      description: string;
    }
  | {
      type: "callout";
      title: string;
      text: string;
    };

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  colorToken: string;
  colorHex: string;
  colorName: string;
  textColor: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socialLinks?: {
    linkedin?: string;
    website?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  coverTone: "green" | "dark" | "blue" | "purple" | "orange" | "gray";
  author: string;
  authorRole: string;
  authorAvatar: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: string;
  categorySlug: string;
  tags: string[];
  tagSlugs: string[];
  status: BlogPostStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage: string;
  content: BlogContentBlock[];
  relatedPosts: string[];
  tableOfContents: Array<{
    id: string;
    title: string;
  }>;
  canonicalUrl?: string;
}

export interface BlogFilters {
  query?: string;
  category?: string;
  tag?: string;
  status?: BlogPostStatus;
  featured?: boolean;
}
