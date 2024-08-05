import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BirthdayForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://birthday-reminder-backend-vggr.onrender.com/birthdays`,
        {
          username,
          email,
          dateOfBirth,
        }
      );

      if (response.status === 201) {
        toast.success("Celebrants added successfully!");
        console.log("Celebrants added successfully!");
        setUsername("");
        setEmail("");
        setDateOfBirth("");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error: any) {
      if (error.response && error.response.data.state === "EmptyFields") {
        toast.error("Username, email or date of birth is missing!");
      } else if (
        error.response &&
        error.response.data.state === "DuplicateEmail"
      ) {
        toast.error("Email already in use!");
      } else if (
        error.response &&
        error.response.data.state === "DuplicateUsername"
      ) {
        toast.error("Username already in use!");
      } else {
        console.error("Error adding celebrant:", error);
        toast.error("An error while adding the celebrant!");
      }
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        <div className="label-input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            required
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
            required
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="text"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </div>

        <button className="submit-btn" type="submit">
          Add Celebrant
        </button>
      </form>
    </div>
  );
};

export default BirthdayForm;
