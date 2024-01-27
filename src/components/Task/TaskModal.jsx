/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTaskDispatch } from "../../context/TaskContext";

const TaskModal = ({ setShowModal, editedTask, onCancel, setEditedTask }) => {
  const [task, setTask] = useState(
    editedTask || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavourite: false,
    }
  );

  const dispatch = useTaskDispatch();
  const [isAdd, setIsAdd] = useState(Object.is(editedTask, null));

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value.split(",");
    }
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdd) {
      dispatch({
        type: "added",
        newTask: task,
      });
    } else {
      dispatch({
        type: "edited",
        newTask: task,
      });
      setEditedTask(null);
    }

    setShowModal(false);
  };

  return (
    <>
      <div className='bg-black/65 fixed w-full h-screen top-0 left-0 z-[100]'></div>
      <form
        onSubmit={handleSubmit}
        className='mx-auto my-10 w-full absolute z-[101] top-1/3 left-1/4 max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11'
      >
        <h2 className='mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]'>
          {isAdd ? " Add New Task" : "Update Task"}
        </h2>

        {/* <!-- inputs --> */}
        <div className='space-y-9 text-white lg:space-y-10'>
          {/* <!-- title --> */}
          <div className='space-y-2 lg:space-y-3'>
            <label htmlFor='title'>Title</label>
            <input
              className='block w-full rounded-md bg-[#2D323F] px-3 py-2.5'
              type='text'
              name='title'
              id='title'
              value={task.title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <!-- description --> */}
          <div className='space-y-2 lg:space-y-3'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]'
              type='text'
              value={task.description}
              onChange={handleInputChange}
              name='description'
              id='description'
              required
            ></textarea>
          </div>
          {/* <!-- input group --> */}
          <div className='grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20'>
            {/* <!-- tags --> */}
            <div className='space-y-2 lg:space-y-3'>
              <label htmlFor='tags'>Tags</label>
              <input
                className='block w-full rounded-md bg-[#2D323F] px-3 py-2.5'
                type='text'
                value={task.tags}
                onChange={handleInputChange}
                name='tags'
                id='tags'
                required
              />
            </div>
            {/* <!-- priority --> */}
            <div className='space-y-2 lg:space-y-3'>
              <label htmlFor='priority'>Priority</label>
              <select
                className='block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5'
                name='priority'
                id='priority'
                value={task.priority}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select Priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </div>
        </div>
        {/* <!-- inputs ends --> */}
        <div className='mt-16 flex justify-between lg:mt-20'>
          <button
            type='submit'
            className='rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80'
          >
            {isAdd ? "  Create new Task" : "Update Task"}
          </button>
          <button
            onClick={onCancel}
            className='rounded bg-rose-600 px-4 py-2 text-white transition-all hover:opacity-80'
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskModal;
