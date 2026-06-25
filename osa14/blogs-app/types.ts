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

export interface RegisterInput {
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterFormErrors {
  username?: string;
  name?: string;
  password?: string;
}

export interface RegisterFormState {
  errors: RegisterFormErrors;
  values: RegisterInput;
}

export type NotificationType = 'info' | 'error';

export interface NotificationContextType {
  message: string;
  type: NotificationType;
  showNotification: (msg: string, msgType?: NotificationType) => void;
}
