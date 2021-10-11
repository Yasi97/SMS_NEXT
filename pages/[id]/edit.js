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
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

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

const Editstudent = ({ student }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    fullname: student.fullname,
    age: student.age,
    subject: student.subject,
    nic: student.nic,
    contact: student.contact,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateStudent();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateStudent = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/students/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/next/allStudents");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.fullname) {
      err.fullname = "fullname is required";
    }
    if (!form.age) {
      err.age = "age is required";
    }
    if (!form.subject) {
      err.subject = "subject is required";
    }
    if (!form.nic) {
      err.nic = "nic is required";
    }
    if (!form.contact) {
      err.contact = "contact no is required";
    }

    return err;
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update student
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={
                errors.fullname
                  ? { content: "Please enter a name", pointing: "below" }
                  : null
              }
              fullWidth
              id="name"
              label="Name with initials"
              name="name"
              autoComplete="name"
              autoFocus
              value={form.fullname}
              onChange={handleChange}
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
              value={form.age}
              onChange={handleChange}
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
              value={form.subject}
              onChange={handleChange}
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
              value={form.nic}
              onChange={handleChange}
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
              value={form.contact}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit Now
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

Editstudent.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`);
  const { data } = await res.json();

  return { student: data };
};

export default Editstudent;
