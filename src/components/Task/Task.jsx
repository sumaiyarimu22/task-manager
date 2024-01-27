/* eslint-disable react/prop-types */

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useTaskDispatch } from "../../context/TaskContext";

const Task = ({ task, onEditTask }) => {
  const dispatch = useTaskDispatch();

  const handleFavourite = (favId) => {
    dispatch({
      type: "favourite",
      favId,
    });
  };

  const handleDeleteTask = (deleteTd) => {
    dispatch({
      type: "deleted",
      deleteTd,
    });
  };
  return (
    <tr className='border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2'>
      <td onClick={() => handleFavourite(task.id)}>
        {task.isFavourite ? (
          <FaStar color='yellow' />
        ) : (
          <FaRegStar color='gray' />
        )}
      </td>
      <td>{task.title}</td>
      <td>
        <div>{task.description}</div>
      </td>
      <td>
        <ul className='flex justify-center gap-1.5 flex-wrap'>
          {task.tags.map((tag, index) => (
            <li key={index}>
              <span className='inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]'>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className='text-center'>{task.priority}</td>
      <td>
        <div className='flex items-center justify-center space-x-3'>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className='text-red-500'
          >
            Delete
          </button>
          <button onClick={() => onEditTask(task)} className='text-blue-500'>
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
