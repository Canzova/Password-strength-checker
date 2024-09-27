import { useEffect, useRef, useState } from "react";
import "./strengthChecker.css";

// Logos
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const StrengthChecker = () => {
  const password = useRef(null);
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showMessage = () => {
    let temp = "";

    if (strength === 1) temp = "Weak";
    if (strength === 2) temp = "Medium";
    if (strength === 3) temp = "Strong";
    if (strength === 4) temp = "Very Strong";

    setMessage(temp);
  };

  useEffect(() => {
    showMessage();
  }, [strength]);

  const handleChange = () => {
    let strengthScore = 0;

    if (password.current.value.length >= 8) strengthScore += 1;
    if (/[A-Z]/.test(password.current.value)) strengthScore += 1;
    if (/[0-9]/.test(password.current.value)) strengthScore += 1;
    if (/[^A-Za-z0-9]/.test(password.current.value)) strengthScore += 1;

    setStrength(strengthScore);
  };

  return (
    <div className="main_wrapper">
      {/* <div className="upper"> */}
      <input
        ref={password}
        onChange={handleChange}
        type={visible === true ? "text" : "password"}
        className="password_input"
        placeholder="Enter your password"
      />
      <div
        className="toggle-password"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </div>
      {/* </div> */}

      <div className="strength-slider">
        <div
          className={`slider-fill strength-${strength}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>

      <div className={`message`}>{message}</div>
    </div>
  );
};

export default StrengthChecker;
