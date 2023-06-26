export interface Comment {
  id: string;
  createdAt: string;
  postId: string;
  userId: string;
  message: string;
  user?: {
    name: string;
    image: string;
  }
}

export interface PostType {
	id: string;
	createdAt: string;
	title: string;
	user: {
		name: string;
		image: string;
	};
	comments: Comment[];
}

export interface UserPost {
  id: string;
  name: string;
  email: string;
  image: string;
  posts: {
    id: string;
    createdAt: string;
    title: string;
    comments: Comment[];
  }[];
}