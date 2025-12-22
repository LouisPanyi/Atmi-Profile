export interface Section {
  image?: string;
  caption?: string;
  description?: string;
}

export interface NewsRow {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  sections: string; 
}

export interface NewsListItem {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  sections: string;
}

export interface Pagination {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems?: number;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}
