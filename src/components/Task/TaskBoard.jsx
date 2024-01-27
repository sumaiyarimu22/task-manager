import { useState } from "react";
import TaskAction from "./TaskAction";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import EmptyTAsk from "./EmptyTAsk";
import TaskContextProvider, { useTask } from "../../context/TaskContext";

const TaskBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const tasks = useTask();

  const handleEditTask = (editTask) => {
    setEditedTask(editTask);
    setShowModal(true);
  };

  const handleCloseTask = () => {
    setEditedTask(null);
    setShowModal(false);
  };

  return (
    <TaskContextProvider>
      <section className='mb-20' id='tasks'>
        {showModal && (
          <TaskModal
            editedTask={editedTask}
            onCancel={handleCloseTask}
            setShowModal={setShowModal}
            setEditedTask={setEditedTask}
          />
        )}
        <div className='container mx-auto'>
          {/* <!-- Search Box Ends --> */}
          <div className='rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16'>
            <TaskAction onShowModal={() => setShowModal(true)} />
            {tasks?.length === 0 ? (
              <EmptyTAsk />
            ) : (
              <TaskList tasks={tasks} onEditTask={handleEditTask} />
            )}
          </div>
        </div>
      </section>
    </TaskContextProvider>
  );
};

export default TaskBoard;
