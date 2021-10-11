import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Linkk from "next/link";
import { useSession } from "next-auth/client";
import Nav from "../../components/navbar";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Student management system
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();

  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [subject, setSubject] = useState("");
  const [nic, setNic] = useState("");
  const [contact, setContact] = useState("");
  //const [data, setData] = useState([]);

  function sendData(e) {
    e.preventDefault();

    const newData = {
      fullname,
      age,
      subject,
      nic,
      contact,
    };
    console.log(newData);
    //window.alert("Successfully registered");

    axios
      .post("http://localhost:3000/api/students", newData)
      .then(() => {
        alert("Student added");
      })
      .catch((err) => {
        alert(err);
      });
    //window.location.reload(false);
    window.location.href = "http://localhost:3000/next/allStudents";
  }
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  if (!session) return <p>You are not authenciated</p>;

  return (
    <div>
      <Nav />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register student
          </Typography>
          <form onSubmit={sendData} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name with initials"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="age"
              label="age"
              id="age"
              autoComplete="age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="subject"
              label="registration subject"
              name="subject"
              autoComplete="subject"
              autoFocus
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="NIC"
              label="NIC"
              name="NIC"
              autoComplete="NIC"
              autoFocus
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Contact_number"
              label="contact number"
              name="Contact_number"
              autoComplete="Contact_number"
              autoFocus
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register Now
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Register;
