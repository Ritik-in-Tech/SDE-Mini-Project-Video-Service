import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import VideoPlayer from "./pages/video";
import "./App.css";
import { API_BASE_URL_AUTH_PROD, API_BASE_URL_VIDEO } from "./config";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  //   if (authToken) {
  //     fetch(`${API_BASE_URL_VIDEO}/api/v1/users`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     })
  //       .then(async (res) => {
  //         const data = await res.json();
  //         if (res.status === 200) {
  //           setUser(data.data); // Store user details in state
  //           navigate("/videoPlayer");
  //         } else {
  //           localStorage.removeItem("authToken");
  //           navigate("/login");
  //         }
  //       })
  //       .catch(() => {
  //         localStorage.removeItem("authToken");
  //         navigate("/login");
  //       });
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <div>
      {/* <nav>
        <ul>
          {!user ? ( // Conditionally render Sign Up and Login links
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li style={{ float: "right", marginRight: "10px" }}></li>
          )}
        </ul>
      </nav> */}

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/videoPlayer"
          element={<VideoPlayer user={user} />} // Pass user details as props
        />
      </Routes>
    </div>
  );
};

export default App;