import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="shadow-md">
      <Link to="/">
        <div className="max-w-[1200px] m-auto p-2.5 pl-10">
          <img src={logo} className="w-[170px] h-[30px]" />
        </div>
      </Link>

      <h1 className="text-center font-medium text-[25px]">Dashboard</h1>

      <div className="flex gap-2 md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <img
              alt="user"
              src={currentUser.profilePicture}
              className="w-10 h-10 rounded-full"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm ">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>

        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default Header;
