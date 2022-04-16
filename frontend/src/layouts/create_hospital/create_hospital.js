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
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { register, clearErrors } from "Actions/userActions";
import {
  createHospital,
  resetHospital,
  clearErrors as clearErrorsHospital,
} from "Actions/hospitalActions";
import { updateProfile } from "Actions/userActions";
import { resetProfileUpdate } from "Actions/userActions";

const Create_Hospitals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  // const marginTop = { marginTop: 5 }

  const [nameH, setHName] = useState("");
  const [addressH, setHAddress] = useState("");
  const [gst, setGst] = useState("");
  const [desclaimer, setDesclaimer] = useState("");
  const [tandc, setTandc] = useState("");

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

  const [admin, setAdmin] = useState(false);
  const [adminID, setAdminID] = useState("");

  function adharValidation(no) {
    const regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    return regexp.test(no);
  }

  function panValidation(no) {
    const regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    return regexp.test(no);
  }

  function gstValidation(no) {
    const regexp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return regexp.test(no);
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (gst !== "" && !gstValidation(gst)) {
      return alert.error("Incorrect GST format");
    }

    const hospitaData = {
      name: nameH,
      address: addressH,
      GST: gst,
      desclaimer,
      termsAndConditions: tandc,
      admin: adminID,
    };
    dispatch(createHospital(hospitaData));
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

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
      Adhar: adhar,
      Pan: pan,
      Address: address,
      role,
      password,
      isActive,
      isAdmin: true,
    };
    dispatch(register(userData));
  };

  const { error, loading, user } = useSelector((state) => state.registerUser);
  const { errorHospital, loadingHospital, hospital } = useSelector(
    (state) => state.registerHospital
  );
  const {
    loading: loadingUpdate,
    isUpdated,
    error: errorUpdate,
  } = useSelector((state) => state.profileUpdate);

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    } else if (user !== null && user.name) {
      // navigate("/allusers");
      console.log("success", user);
      setAdmin(true);
      setAdminID(user._id);
      alert.success("Admin Created " + adminID + " Now create hospital");
    }
  }, [dispatch, error, user]);

  useEffect(() => {
    if (!loadingUpdate && isUpdated) {
      dispatch(resetProfileUpdate());
      alert.success("user updated");
      navigate("/hospitals");
    }
    if (errorUpdate) {
      console.log(errorUpdate);
      alert.error(errorUpdate);
      dispatch(clearErrors());
    }
    if (errorHospital) {
      console.log(errorHospital);
      alert.error(errorHospital);
      dispatch(clearErrorsHospital());
    } else if (hospital !== null && hospital.name) {
      console.log("success", hospital);
      alert.success("Hopital Created");
      dispatch(resetHospital());
      dispatch(updateProfile({ ...user, hospitalID: hospital._id }, adminID));
    }
  }, [
    dispatch,
    errorHospital,
    hospital,
    errorUpdate,
    isUpdated,
    loadingUpdate,
  ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Create Admin First
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit1}>
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
                id="outlined-size-small"
                size="small"
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <FormControl component="fieldset" style={{ marginTop: 5 }}>
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

            {/* <TextField fullWidth label='Age' variant="outlined" placeholder="Enter your age" /> */}

            <Grid align="left">
              <FormControl variant="outlined">
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
                  {/* <option>Receptionist</option> */}
                </Select>

                <br />
                {/* <FormControl component="fieldset" style={marginTop}>
                                <FormLabel component="legend" required>Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender"  style={{ display: 'initial' }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                                </FormControl> */}

                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {/* <TextField
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="Confirm your password"
                /> */}
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="Is Active"
                  onChange={() => {
                    setIsActive(!isActive);
                  }}
                />
                {!admin ? (
                  <Button type="submit" variant="contained" color="primary">
                    create Admin
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled
                  >
                    create Admin
                  </Button>
                )}
              </FormControl>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Hospital Form</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit2}>
            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                variant="outlined"
                label="Name"
                placeholder="Enter Hospital name"
                required
                value={nameH}
                onChange={(e) => setHName(e.target.value)}
              />

              <br />
              <br />
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
                value={addressH}
                onChange={(e) => setHAddress(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            <Grid align="left">
              <TextField
                style={{
                  width: "500px",
                }}
                label="GST No."
                variant="outlined"
                placeholder="Enter your GST Number"
                required
                value={gst}
                onChange={(e) => setGst(e.target.value)}
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
                label="Disclaimer"
                variant="outlined"
                placeholder="Enter your Disclaimer"
                required
                value={desclaimer}
                onChange={(e) => setDesclaimer(e.target.value)}
              />
              <br />
              <br />

              <TextField
                style={{
                  width: "500px",
                }}
                multiline
                rows={3}
                label="Terms And Conditions"
                variant="outlined"
                placeholder="Enter your Terms And Conditions"
                required
                value={tandc}
                onChange={(e) => setTandc(e.target.value)}
              />
              <br />
              <br />
            </Grid>

            <Grid align="left">
              <FormControl variant="outlined">
                {admin ? (
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled
                  >
                    Submit
                  </Button>
                )}
              </FormControl>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
};

export default Create_Hospitals;
