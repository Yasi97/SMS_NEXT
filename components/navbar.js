import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useSession, signOut } from "next-auth/client";
//import Image from "next/image";

const Navbar = () => {
  const [session, loading] = useSession();

  if (!session) return null;
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      //className={}
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          <img
            src="https://bcassetcdn.com/public/blog/wp-content/uploads/2019/06/18095205/new-education.png"
            alt=""
            width="66px"
            height="66px"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/next/register">
                <a className="nav-link">Register Student</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/next/allStudents">
                <a className="nav-link">Student details</a>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <img
              src={session.user.image}
              className="img-fluid rounded-circle"
              alt="logo"
              width={35}
              height={35}
            />

            <h5 className="me-3 ms-1 mt-1 text-danger text-capitalize">
              {session.user.name}
            </h5>

            <button
              className="btn btn-outline-danger"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
