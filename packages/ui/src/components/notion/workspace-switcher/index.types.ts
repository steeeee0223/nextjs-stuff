export interface Page {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
}

export interface WorkspaceState {
  id: string;
  name: string;
  icon: string;
  members: string[];
  pages: Page[];
}

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  favorites: string[];
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  isDarkMode: boolean;
  profilePicture: {
    url: string;
  };
  workspaces: Workspace[];
}
