import axios from "axios";

const API_URL = "https://mern-first-app-gazali.onrender.com/api/";


//* Get Goals
const getGoals = async (token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.get(API_URL + "goals", config)
    
    return res.data
}

//* Create Goal
const createGoal = async (goalData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.post(API_URL + "goals", goalData, config)  //! the second arg in axios.post() IS THE body, AND YOU SHOULD MAKW SURE THAT THE CONTENT OF IT IS AN OBJECT, we passed it as an object in the GoalForm.jsx directly like this: dispatch(createGoal({text}))
    
    return res.data
}

//* Update Goal
const updateGoal = async (id, goalData) => {
    const res = await axios.put(API_URL + "goals" + `${id}`, goalData)
    return res.data
}

//* Remove Goal
const removeGoal = async (id, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(API_URL + "goals/" + `${id}`, config)
    return res.data
}

const goalService = {
    createGoal,
    getGoals, 
    updateGoal,
    removeGoal
}


export default goalService
