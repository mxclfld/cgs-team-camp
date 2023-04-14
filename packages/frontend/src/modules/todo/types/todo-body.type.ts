export interface ITodoBody {
  todo: {
    id?: string;
    name: string;
    description: string;
    isPrivate: boolean;
    isCompleted: boolean;
  };
}
