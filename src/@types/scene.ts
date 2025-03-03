export interface Scene {
  authorId: string;
  title: string;
  script: string;
  thumb_url: string;
  scene_url: string;
  source: string;
  genre: string[] | undefined;
  level: string;
  accent: string[] | undefined;
}
