import { FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../store/slices/goalsSlice";

const GoalItem = ({ goal }) => {

    const dispatch = useDispatch()

    const removeGoal = (id) => {
        dispatch(deleteGoal(id))
    }

  return (
    <div className='w-full pt-2 pb-4 px-2 rounded-lg border-2 border-blue-500 relative mt-6 bg-blue-100'>
        <div className='text-left font-semibold text-sm text-blue-600'>
            { new Date(goal.createdAt).toLocaleString("en-US") }
        </div>
        <h2 className='text-xl sm:w-auto w-[160px] sm:text-center sm:mt-0 text-left mt-3 font-bold text-blue-900'>
            { goal.text }
        </h2>
        <button onClick={() => { removeGoal(goal._id) }} className='absolute right-[-2px] top-[-2px] gap-2 w-[100px] h-[53%] flex justify-center items-center bg-red-500 hover:bg-red-700 transition-all rounded-tr-lg text-white px-3 py-1'>
            Delete <FaTrash />
        </button>
        <button className='absolute right-[-2px] bottom-[-2px] w-[100px] gap-2 h-[53%] flex justify-center items-center bg-green-600 transition-all hover:bg-green-800 rounded-br-lg text-white px-3 py-1'>
            Update <FaPen />
        </button>
    </div>
  )
}

export default GoalItem