import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createGoal } from '../store/slices/goalsSlice';


const GoalForm = () => {
    const [text, setText] = useState("")
    
    const dispatch = useDispatch();
    
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createGoal({text}))
        setText("")
    }

  return (
    <section className='p-4 mt-4 flex flex-col gap-6 rounded-lg border-2 bg-gray-200/50'>
        <h2 className='font-bold text-3xl text-blue-500'>Add a New Goal</h2>
        <form className='flex justify-center items-center  gap-3' onSubmit={onSubmit}>
            <label className="font-bold text-blue-800 text-2xl" htmlFor="text">Goal</label>
            <input value={text} onChange={(e) => setText(e.target.value)} className="appearance-none bg-gray-100 w-full rounded-lg p-2 border-2 border-gray-200 focus:outline-none focus:border-gray-300 focus:bg-gray-200" id="text" name="text" type="text" required />
            <button className='px-4 w-[150px] py-[0.6rem] text-gray-200 rounded-lg bg-blue-500 hover:bg-blue-700 transition-all' type="submit">
                Add Goal
            </button>
        </form>
    </section>
  )
}

export default GoalForm