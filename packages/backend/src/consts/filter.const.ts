const FILTER: { [key: string]: object } = {
  private: {
    isPrivate: true
  },
  completed: {
    isCompleted: true
  },
  public: {
    isPrivate: false
  }
};

export { FILTER };
