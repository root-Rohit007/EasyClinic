import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@mui/material/Box";
import Checkbox from "@material-ui/core/Checkbox";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

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

  const marginTop = { marginTop: 5 };

  const [salutation, setStalutation] = useState("");
  // const [casepaper, setCasepaper] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [bg, setBg] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [asthma, setAsthama] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [highbp, setHighbp] = useState(false);
  const [ks, setKs] = useState(false);
  const [thyroid, setThyroid] = useState(false);
  const [arthritis, setArthritis] = useState(false);
  const [otherDiseases, setOtherDiseases] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    // console.log(salutation, name, phone, email, gender, address, age, bg);
    console.log(bg);
    let patitionsData = {
      // casePaperNo: casepaper,
      salutation,
      name,
      email,
      phone,
      phone2: phone2 === "" ? "0000000000" : phone2,
      gender,
      address,
      age,
      bloodGroup: bg,
      height,
      weight,
      asthma,
      diabetes,
      highbp,
      kidenyStone: ks,
      thyroid,
      arthritis,
      otherDiseases,
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
            <h2 style={headerStyle}>Patient Details</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Case Paper No:"
                    placeholder="Enter case paper no"
                    required
                    value={casepaper}
                    onChange={(e) => setCasepaper(e.target.value)}
                  />
                </Grid> */}

                <Grid item xs={3}>
                  <TextField
                    label="Mr./Mrs."
                    variant="outlined"
                    placeholder="Mr./Mrs."
                    required
                    value={salutation}
                    onChange={(e) => setStalutation(e.target.value)}
                  />
                </Grid>

                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Mobile 1"
                    variant="outlined"
                    placeholder="Enter your Phone Number"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Mobile 2"
                    variant="outlined"
                    placeholder="Enter your Phone Number"
                    fullWidth
                    // required
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    placeholder="Enter your Email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Address"
                    variant="outlined"
                    placeholder="Enter your Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Age"
                    variant="outlined"
                    placeholder="Enter your age"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Blood group"
                    // value={currency}
                    // onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                  >
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Height"
                    variant="outlined"
                    placeholder="Enter height in cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Weight"
                    variant="outlined"
                    placeholder="Enter weight in kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="Astama"
                    onChange={() => {
                      setAsthama(!asthma);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="Diabetes"
                    onChange={() => {
                      setDiabetes(!diabetes);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="High-BP"
                    onChange={() => {
                      setHighbp(!highbp);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="Kidneystone"
                    onChange={() => {
                      setKs(!ks);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="Thyroid"
                    onChange={() => {
                      setThyroid(!thyroid);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="Arthritis"
                    onChange={() => {
                      setArthritis(!arthritis);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label>Other diseases : </label>
                  <ReactTagInput
                    tags={otherDiseases}
                    onChange={(newTags) => setOtherDiseases(newTags)}
                  />
                </Grid>

                <Grid item xs={12} align="center">
                  <Button type="submit" variant="contained" color="primary">
                    Submit Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
};

export default Patientsform;
