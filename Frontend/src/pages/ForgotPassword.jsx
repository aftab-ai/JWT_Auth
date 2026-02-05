// Third-Party modules.
import { useState } from "react";

// Initial form data.
const initalFormData = {
  email: "",
};

function ForgotPassword() {
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
    // Forgot Password.
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center h-2/5 w-xl p-8 bg-[#D3D2C7] rounded-lg">
        {/* Heading */}
        <h2 className="text-[#10403B] font-bold text-2xl">Recover Password</h2>

        <form
          onSubmit={handleSubmit}
          className="text-[#10403B] font-semibold flex flex-col gap-4 w-full"
        >
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
              placeholder="Enter your registered email..."
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* Send Button */}
          <div className="text-center">
            <input
              className="rounded-full px-4 py-1 mt-2 cursor-pointer bg-[#10403B]
               text-white hover:bg-[#4C5958]"
              type="submit"
              value={"Send OTP"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
