import { useEffect, useState } from "react";
import { TaskStateModel } from "../../models/taskStateModel";
import { initialTaskState } from "./initialTaskState";
import { TaskContenxt } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialTaskState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TaskContenxt.Provider value={{ state, setState }}>
      {children}
    </TaskContenxt.Provider>
  );
}
