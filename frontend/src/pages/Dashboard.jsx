import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoalForm, Spiner, GoalItem } from "../components";
import { getGoals, reset } from "../store/slices/goalsSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth)
  const { goals, isLoading, isError, message } = useSelector(state => state.goals)
  
 
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    
    if (!user) {
      navigate("/login")
    } else {
      dispatch(getGoals())
    }
    
    
    return () => {
      dispatch(reset())  //! when componenet will unmount
    } 
  }, [navigate, user, dispatch, isError, message])
  
  if (isLoading) {
    return <Spiner />
  }

  return (
    <div className="rounded-lg bg-gray-50 border-2 border-gray-100 pt-4 px-6 pb-8 my-8">
      <section className="flex flex-col gap-4 mb-6">
        <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-blue-500">
          Hello {user && user.name}
        </h1>
        <p className="text-xl font-semibold flex justify-center items-center gap-1">
          Goals Dashboard
        </p>
      </section>
      <GoalForm />
      <section className="flex flex-col justify-center items-center w-full">
        { goals.length > 0 ? (
          <div className="w-full">
            {goals.map(goal => ( 
            <div key={goal._id}>
              <GoalItem goal={goal} />
            </div> 
            ))}
          </div>
        ) : (<h3 className="text-3xl text-blue-700 font-bold">There is no Goals</h3>) }
      </section>
    </div>
  )
}

export default Dashboard