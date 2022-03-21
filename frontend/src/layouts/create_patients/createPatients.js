import React, { useState, useEffect } from "react";
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
//import Checkbox from '@material-ui/core/Checkbox';
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPatients, clearErrors } from "Actions/patientActions";
import { useAlert } from "react-alert";
import { resetPatient } from "Actions/patientActions";

const Patientsform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const hospitalID = useSelector((state) => state.user.user.hospitalID);
  const ID = useSelector((state) => state.user.user._id);
  const { error, loading, patient } = useSelector(
    (state) => state.registerPatients
  );

  const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const [salutation, setStalutation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [bg, setBg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    // console.log(salutation, name, phone, email, gender, address, age, bg);
    const patitionsData = {
      salutation,
      name,
      email,
      phone,
      gender,
      address,
      age,
      bloodGroup: bg,
      hospitalID,
      creatorID: ID,
    };

    dispatch(registerPatients(patitionsData));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    } else if (patient !== null && patient.name) {
      alert.success("Patient created");
      dispatch(resetPatient());
      navigate("/patients");
      console.log("success", patient);
    }
  }, [dispatch, error, patient]);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Patient Details</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid align="left">
              <TextField
                style={{
                  marginRight: "10px",
                  width: "100px",
                }}
                label="Mr./Mrs."
                variant="outlined"
                placeholder="Mr./Mrs."
                required
                value={salutation}
                onChange={(e) => setStalutation(e.target.value)}
              />

              <TextField
                style={{
                  width: "450px",
                }}
                variant="outlined"
                label="Name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <br />

            <Grid align="left">
              <TextField
                type="number"
                style={{
                  marginRight: "20px",
                }}
                label="Phone"
                variant="outlined"
                placeholder="Enter your Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <br />
            <Grid align="left">
              <TextField
                type="email"
                style={{
                  marginRight: "20px",
                }}
                label="Email"
                variant="outlined"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br />
            </Grid>

            <Grid align="left">
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
            <br />

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
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <br />
            <Grid align="left">
              <TextField
                type="number"
                style={{
                  width: "500px",
                }}
                fullWidth
                label="Age"
                variant="outlined"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>

            <br />

            <Grid align="left">
              <FormControl variant="outlined">
                <InputLabel
                  style={{
                    width: "500px",
                  }}
                  htmlFor="outlined-age-native-simple"
                >
                  Blood Group
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  native
                  input={
                    <OutlinedInput
                      name="Role"
                      id="outlined-age-native-simple"
                    />
                  }
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                >
                  <option value="" />
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </Select>
              </FormControl>
            </Grid>
            <br />
            <br />
            <Grid align="center">
              <Button type="submit" variant="contained" color="primary">
                Submit Details
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
};

export default Patientsform;
