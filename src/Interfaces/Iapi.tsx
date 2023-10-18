export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}


export interface LoginProps {
  posts: Post[] | null;
}