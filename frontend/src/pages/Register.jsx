import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setFormData((prevState) =>{
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }
  
  const { name, email, password, password2 } = formData

  return (
    <div className="rounded-lg bg-gray-50 border-2 border-gray-100 pt-4 pb-8 my-8">
      <section className="flex flex-col gap-4 mb-6">
        <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-blue-500">
          <FaUser /> Register
        </h1>
        <p className="text-xl font-semibold">
          Please Create An Account
        </p>
      </section>
      <section>
        <form className="flex flex-col px-4 items-start gap-2" onSubmit={onSubmit}>
            <label className="font-bold text-blue-800" htmlFor="name">Name</label>
            <input onChange={onChange} value={name} className="appearance-none bg-gray-100 w-full rounded-lg p-2 border-2 border-gray-200 focus:outline-none focus:border-gray-300 focus:bg-gray-200" name="name" id="name" type="text" required />
            <label className="mt-4 font-bold text-blue-800" htmlFor="email">Email</label>
            <input onChange={onChange} value={email} className="appearance-none bg-gray-100 w-full rounded-lg p-2 border-2 border-gray-200 focus:outline-none focus:border-gray-300 focus:bg-gray-200" name="email" id="email" type="email" required />
            <label className="mt-4 font-bold text-blue-800" htmlFor="password">Password</label>
            <input onChange={onChange} value={password} className="appearance-none bg-gray-100 w-full rounded-lg p-2 border-2 border-gray-200 focus:outline-none focus:border-gray-300 focus:bg-gray-200" name="password" id="password" type="password" required />
            <label className="mt-4 font-bold text-blue-800" htmlFor="password2">Password Confirmation</label>
            <input onChange={onChange} value={password2} className="appearance-none bg-gray-100 w-full rounded-lg p-2 border-2 border-gray-200 focus:outline-none focus:border-gray-300 focus:bg-gray-200" name="password2" id="password2" type="password" required />
            <button className="mt-5 border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-lg text-lg font-medium hover:bg-blue-500 hover:text-gray-50 transition-all" type="submit">
              Submit
            </button>
        </form>
      </section>
    </div>
  )
}

export default Register