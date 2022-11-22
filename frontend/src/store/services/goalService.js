import axios from "axios";

const API_URL = process.env.APP_URL;


//* Get Goals
const getGoals = async (token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.get(API_URL, config)
    
    return res.data
}

//* Create Goal
const createGoal = async (goalData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.post(API_URL, goalData, config)  //! the second arg in axios.post() IS THE body, AND YOU SHOULD MAKW SURE THAT THE CONTENT OF IT IS AN OBJECT, we passed it as an object in the GoalForm.jsx directly like this: dispatch(createGoal({text}))
    
    return res.data
}

//* Update Goal
const updateGoal = async (id, goalData) => {
    const res = await axios.put(API_URL + `${id}`, goalData)
    return res.data
}

//* Remove Goal
const removeGoal = async (id, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(API_URL + `${id}`, config)
    return res.data
}

const goalService = {
    createGoal,
    getGoals, 
    updateGoal,
    removeGoal
}


export default goalService
