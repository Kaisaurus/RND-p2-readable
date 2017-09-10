const comment = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        id: action.id,
        parentId: action.parentId,
        timestamp: action.timestamp,
        body: action.body,
        author: action.author,
        category: action.category,
        voteScore: action.voteScore,
        deleted: false,
        parentDeleted: false,
      };
    // case 'REMOVE_POST':
    //   if (state.id !== action.id) {
    //     return state
    //   }

    //   return {
    //     ...state,
    //     removed: !state.deleted
    //   }
    default:
      return state;
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [
        ...state,
        comment(undefined, action),
      ];
    // case 'TOGGLE_TODO':
    //   return state.map(t =>
    //     todo(t, action)
    //   )
    default:
      return state;
  }
};

export default comments;
