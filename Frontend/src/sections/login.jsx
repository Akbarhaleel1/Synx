

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    const newErrors = { name: "", email: "", password: "" };

    // Validate name
    if (!formData.name.trim() || !/^[a-zA-Z0-9]+$/.test(formData.name)) {
      newErrors.name = "Name is required and can only contain letters";
      formIsValid = false;
    }

    // Validate email
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailCheck)) {
      newErrors.email = "Email is not valid";
      formIsValid = false;
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = "Password must be more than 6 characters";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      // Submit form data
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <br />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
        <div className="register">
          <p>
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

const SignInForm = () => {
  return (
    <div className="form-container sign-in">
      <form>
        <h1>Sign In</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
        </div>
        <span>or use your email for sign-in</span>
        <br />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <a href="#">Forget Your Password?</a>
        <button type="submit">Login</button>
        <div className="register">
          <p>
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

const TogglePanel = ({ isActive, toggleForm }) => {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div className={`toggle-panel toggle-left ${isActive ? "active" : ""}`}>
          <h1>Welcome Back!</h1>
          <p>Enter your personal details</p>
          <button className="hidden" onClick={toggleForm}>
            Sign In
          </button>
        </div>
        <div
          className={`toggle-panel toggle-right ${isActive ? "active" : ""}`}
        >
          <h1>Welcome Back!</h1>
          <p>Register with your personal details</p>
          <button className="hidden" onClick={toggleForm}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
