export type PostType = {
  id: number;
  message: string;
  likeCount: number;
};
export type ContactsType = {
  gitHub: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  toutibe: string;
  mainLink: string;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};
