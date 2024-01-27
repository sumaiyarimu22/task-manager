/* eslint-disable no-case-declarations */
export default function taskReducer(draft, action) {
  switch (action.type) {
    case "added":
      draft.push(action.newTask);
      break;

    case "edited":
      const index = draft.findIndex((t) => t.id === action.newTask.id);

      draft[index] = action.newTask;
      break;

    case "favourite":
      const favouriteId = draft.findIndex((t) => t.id === action.favId);
      draft[favouriteId].isFavourite = !draft[favouriteId].isFavourite;
      break;

    case "deleted":
      return draft.filter((task) => task.id !== action.deleteTd);

    case "deleteAll":
      return [];

    case "search":
      return draft.filter((task) =>
        task.title.toLowerCase().includes(action.searchValue.toLowerCase())
      );

    default:
      return draft;
  }
}
