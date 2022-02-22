import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className="flex flex-col">
      <div className="relative z-10 pb-10 mb-20 md:mt-4 navbar">
        <div className="container flex flex-col items-start justify-between px-6 mx-auto lg:flex-row lg:items-center">
          <div className="flex flex-col items-start lg:flex-row lg:items-center ">
            <div className="my-6 ml-0 lg:ml-20 lg:my-0">
              <h4 className="text-xl font-bold leading-tight text-blue-300 ">
                Yvette's Dog Park Finder
              </h4>
              <nav>
                {isLoggedIn ? (
                  <div>
                    {/* The navbar will show these links after you log in */}
                    <Link
                      to="/favorites"
                      className="justify-center inline-block w-full pt-2 pb-5 px-3 text-center"
                    >
                      Favorites
                    </Link>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-row items-center  mt-12 mb-12 space-x-2">
                      {/* The navbar will show these links before you log in */}
                      <Link to="/login">
                        <button className="p-3 mr-3 text-base text-gray-600 bg-blue-300 border-blue-300 rounded-md">
                          Login
                        </button>
                      </Link>
                      <Link
                        to="/signup"
                        className="p-3 ml-3 text-base text-gray-600 bg-blue-300 border-blue-300 rounded-md"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-1 mt-4 rounded-full bg-gradient-to-l from-blue-500 to-pink-500"></div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
