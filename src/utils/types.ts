// Types for User Model
export type User = {
  id: string;
  createdAt: Date;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  meetups?: Meetup[];
  savedMeetups?: SavedMeetup[];
  location?: string;
  description?: string;
};

// Types for Meetup Model
export type Meetup = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  location: string;
  time: string;
  image: string;
  userId: string;
  comments?: Comment[];
  type: string;
  coordinates: number[];
  savedBy?: SavedMeetup[];
};

export type SavedMeetupUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

export type SavedMeetupWithMeetup = {
  meetup: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    location: string;
    time: string;
    image: string;
    userId: string;
    type: string;
    coordinates: number[];
  };
};

export type SavedMeetup = {
  id: string;
  userId: string;
  meetupId: string;
  user: SavedMeetupUser;
  meetup: Meetup;
};

// Types for Comment Model
export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  content: string;
  meetupId: string;
  meetup?: Meetup;
  userId: string;
  parentId?: string;
};

export type CommentWithUserInfo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  content: string;
  meetupId: string;
  userId: string;
  parentId: string | null;
  user: {
    id: string;
    name: string;
  };
};

export type SavedMeetupWithDetails = {
  id: string;
  userId: string;
  meetupId: string;

  meetup: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    location: string;
    time: string;
    image: string;
    userId: string;
    type: string;
    coordinates: number[];

    comments: Array<{
      id: string;
      createdAt: Date;
      updatedAt: Date;
      author: string;
      content: string;
      meetupId: string;
    }>;

    savedBy: Array<{
      id: string;
      userId: string;
      meetupId: string;

      user: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
      };

      meetup: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        location: string;
        time: string;
        image: string;
        userId: string;
        type: string;
        coordinates: number[];
        // Assuming comments and savedBy are not nested again for simplicity
        // Include them if needed, but be mindful of potential deep nesting
        comments?: Comment[];
        savedBy?: SavedMeetup[];
      };
    }>;
  };
};
