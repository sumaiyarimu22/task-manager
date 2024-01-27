import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import taskReducer from "../reducers/TaskReducer";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

const initialTask = {
  id: crypto.randomUUID(),
  title: "Integration API",
  description:
    "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
  tags: ["Web", "Python", "API"],
  priority: "high",
  isFavourite: false,
};

// eslint-disable-next-line react/prop-types
export default function TaskContextProvider({ children }) {
  const [tasks, dispatch] = useImmerReducer(taskReducer, [initialTask]);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

export function useTask() {
  return useContext(TaskContext);
}

export function useTaskDispatch() {
  return useContext(TaskDispatchContext);
}
