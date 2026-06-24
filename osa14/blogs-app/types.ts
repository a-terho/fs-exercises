export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

export interface BlogInput {
  title: string;
  author: string;
  url: string;
}

export interface BlogFormErrors {
  title?: string;
  author?: string;
  url?: string;
}

export interface BlogFormState {
  errors: BlogFormErrors;
  values: BlogInput;
}
