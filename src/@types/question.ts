export interface Question {
  id: string;
  authorId: string;
  sceneId: string;
  statement: string;
  options: string[];
  correctAnswer: number;
}
