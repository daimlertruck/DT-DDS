export const AvatarType = {
  Letter: 'letter',
  Collapsed: 'collapsed',
  Thumbnail: 'thumbnail',
  Photo: 'photo',
} as const;

export type AvatarType = (typeof AvatarType)[keyof typeof AvatarType];
