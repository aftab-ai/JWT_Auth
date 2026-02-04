// Third-Party modules.
import { useState } from "react";

// Initial form data.
const initalFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [formData, setFormData] = useState(initalFormData);

  // Handle form change state.
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle form state(data).
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  // Handle form submit.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submit default behaviour.

    setFormData(initalFormData); // Set form state to initial after submit.
  };

  return (
    // Signup Form.
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center h-4/5 w-xl p-8 bg-[#D3D2C7] rounded-lg">
        {/* Heading */}
        <h2 className="text-[#10403B] font-bold text-2xl">Sign Up</h2>

        <form
          onSubmit={handleSubmit}
          className="text-[#10403B] font-semibold flex flex-col gap-4 w-full"
        >
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg">
              Username:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="text"
              id="username"
              name="username"
              placeholder="Enter name..."
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="text"
              id="email"
              name="email"
              placeholder="Enter email..."
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-lg">
              Confirm Password:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter password again..."
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>

          {/* Signup Button */}
          <div className="text-center">
            <input
              className="rounded-full px-4 py-1 mt-4 cursor-pointer bg-[#10403B]
               text-white hover:bg-[#4C5958]"
              type="submit"
              value={"Signup"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
