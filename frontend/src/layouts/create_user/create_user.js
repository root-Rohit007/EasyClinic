import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, clearErrors, resetUser } from "Actions/userActions";
import { useAlert } from "react-alert";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const hospitalID = useSelector((state) => state.user.user.hospitalID);
  const { error, loading, user } = useSelector((state) => state.registerUser);

  const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const [salutation, setStalutation] = useState("");
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [adhar, setAdhar] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function adharValidation(no) {
    const regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

    return regexp.test(no);
  }

  function panValidation(no) {
    const regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    return regexp.test(no);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(
    //   salutation,
    //   name,
    //   email1,
    //   email2,
    //   phone,
    //   phone2,
    //   age,
    //   gender,
    //   degree,
    //   adhar,
    //   pan,
    //   address,
    //   role,
    //   password,
    //   isActive
    // );
    if (adhar !== "" && !adharValidation(adhar)) {
      return alert.error("Incorrect Aadhar format");
    }

    if (pan !== "" && !panValidation(pan)) {
      return alert.error("Incorrect PAN format");
    }

    const userData = {
      salutation,
      name,
      email: email1,
      email2,
      phone,
      phone2: phone2 === "" ? "0000000000" : phone2,
      age: +age,
      gender,
      degree: degree.split(" "),
      adhar: adhar,
      pan: pan,
      address: address,
      role,
      password,
      isActive,
      hospitalID,
    };
    dispatch(register(userData));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    } else if (user !== null && user.name) {
      dispatch(resetUser());
      navigate("/allusers");
      console.log("sucess", user);
    }
  }, [dispatch, error, user]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Create user</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create user account!
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid align="left">
              <TextField
                style={{
                  marginRight: "10px",
                  width: "120px",
                }}
                label="Mr./Mrs./Dr."
                variant="outlined"
                placeholder="Mr./Mrs./Dr."
                required
                value={salutation}
                onChange={(e) => setStalutation(e.target.value)}
              />

              <TextField
                style={{
                  width: "610px",
                }}
                variant="outlined"
                label="Name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* //multiline 
                    // maxRows={4}
                    // id="outlined-multiline-flexible" */}

            <br />

            {/* <TextField id="outlined-basic" halfWidth label='Name' placeholder="Enter your name" required/> */}
            <Grid align="left">
              <TextField
                style={{
                  marginRight: "20px",
                  width: "360px",
                }}
                label="Primary Email"
                variant="outlined"
                placeholder="Enter your email"
                required
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />

              <TextField
                style={{
                  marginRight: "20px",
                  width: "360px",
                }}
                label="Secondary Email"
                variant="outlined"
                placeholder="Enter your email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
            </Grid>
            <br />

            {/* style ={{width: '80%'}} */}
            <Grid align="left">
              <TextField
                style={{
                  marginRight: "20px",
                  width: "360px",
                }}
                label="Primary Phone"
                variant="outlined"
                placeholder="Enter your Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <TextField
                style={{
                  marginRight: "20px",
                  width: "360px",
                }}
                label="Secondary Phone"
                variant="outlined"
                placeholder="Enter your Phone"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
              />
            </Grid>
            {/* <TextField fullWidth label='Phone Number' variant="outlined" placeholder="Enter your phone number" />
                    <br />
                    <br />
                    <TextField fullWidth label='Secondary Phone Number' variant="outlined" placeholder="Enter your phone number" />
                    <br />
                    <br /> */}
            <br />
            <Grid align="left">
              <TextField
                style={{
                  marginRight: "40px",
                  width: "100px",
                }}
                label="Age"
                type="number"
                id="outlined-size-small"
                size="small"
                variant="outlined"
                value={age}
                required
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onChange={(e) => setAge(e.target.value)}
              />

              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend" required>
                  Gender
                </FormLabel>

                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                label="Degree"
                variant="outlined"
                placeholder="Enter your degrees"
                onChange={(e) => setDegree(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            {/* <Grid align='left'>
                    <TextField 
                    style={{
                      width:'500px'
                      }}
                    fullWidth label='Address' variant="outlined" placeholder="Enter your Address" required/>
                    <br />
                    <br />
                    </Grid> */}

            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                label="Aadhaar No."
                variant="outlined"
                placeholder="Enter your Aadhaar Number"
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                label="PAN No."
                variant="outlined"
                placeholder="Enter your PAN Number"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                multiline
                rows={3}
                label="Address"
                variant="outlined"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            <Grid align="left">
              <FormControl variant="outlined" required>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Role
                </InputLabel>
                <Select
                  native
                  input={
                    <OutlinedInput
                      name="Role"
                      id="outlined-age-native-simple"
                    />
                  }
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" />
                  <option>Doctor</option>
                  <option>Receptionist</option>
                </Select>

                <br />

                <TextField
                  type={"password"}
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="Is Active"
                  onChange={() => {
                    setIsActive(!isActive);
                  }}
                />
                <Button type="submit" variant="contained" color="primary">
                  create user
                </Button>
              </FormControl>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
};

export default Signup;
