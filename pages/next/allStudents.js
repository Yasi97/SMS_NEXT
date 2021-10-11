import Link from "next/link";
import fetch from "isomorphic-unfetch";
import styles from "../../styles/allStudents.module.css";
import { useSession } from "next-auth/client";
import Nav from "../../components/navbar";

const Index = ({ students }) => {
  const deleteStudent = async (studentId) => {
    if (confirm("Are you sure?")) {
      const response = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );
      window.location.reload(false);
      const data = await response.json();
      console.log(data);
    } else {
      window.location.reload(false);
    }
  };
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  if (!session) return <p>You are not authenciated</p>;

  return (
    <div>
      <Nav />
      <div className={styles.bg1}>
        <br />
        <br />
        <div className={styles.yasi1}>
          <h1>All Students</h1>
          <br />
          <div>
            <table className={styles.yasi3}>
              <div className="row">
                <div className="col-sm-2">
                  <h4>Student ID</h4>
                </div>
                <div className="col-sm-2">
                  <h4>Full name</h4>
                </div>
                <div className="col-sm-1">
                  <h4>Age</h4>
                </div>
                <div className="col-sm-1">
                  <h4>Subject</h4>
                </div>
                <div className="col-sm-1">
                  <h4>NIC</h4>
                </div>

                <div className="col-sm-2">
                  <h4>Mobile No</h4>
                </div>
                <div className="col-sm-1">
                  <h4>Date</h4>
                </div>
              </div>
              <hr />
              {students.map((student) => {
                return (
                  <div key={student._id} className={styles.yasi6}>
                    <div className="row">
                      <div className="col-sm-2">
                        <a>{student._id}</a>
                      </div>

                      <div className="col-sm-2">
                        <a>{student.fullname}</a>
                      </div>

                      <div className="col-sm-1">
                        <a>{student.age}</a>
                      </div>
                      <div className="col-sm-1">
                        <a>{student.subject}</a>
                      </div>
                      <div className="col-sm-1">
                        <a>{student.nic}</a>
                      </div>
                      <div className="col-sm-2">
                        <a>{student.contact}</a>
                      </div>
                      <div className="col-sm-1">
                        <a>{student.date}</a>
                      </div>
                      <div className="col-sm-1">
                        <Link href={`/${student._id}/edit`}>
                          <a>
                            <button type="button" className="btn btn-info">
                              Edit
                            </button>
                          </a>
                        </Link>
                      </div>
                      <div className="col-sm-1">
                        <button
                          onClick={() => deleteStudent(student._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/students");
  const { data } = await res.json();
  console.log(data);

  return { students: data };
};

export default Index;
