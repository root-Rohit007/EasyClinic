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
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  getHospitalbyID,
  clearErrors as clearErrorsHospital,
} from "Actions/hospitalActions";
import {
  updateHospital,
  resetUpdateHospital,
  clearErrors,
} from "Actions/hospitalActions";

const Create_Hospitals = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    hospital,
    loading: loadingHospital,
    error: errorHospital,
  } = useSelector((state) => state.hospitalDetails);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    isUpdated,
  } = useSelector((state) => state.hospitalEdits);

  const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  // const marginTop = { marginTop: 5 }

  const [nameH, setHName] = useState("");
  const [addressH, setHAddress] = useState("");
  const [gst, setGst] = useState("");
  const [desclaimer, setDesclaimer] = useState("");
  const [tandc, setTandc] = useState("");
  const [admin, setAdmin] = useState("");

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(nameH, addressH, gst, desclaimer, tandc);
    const hospitaData = {
      name: nameH,
      address: addressH,
      GST: gst,
      desclaimer,
      termsAndConditions: tandc,
      admin,
    };
    dispatch(updateHospital(hospitaData, id));
  };

  useEffect(() => {
    if (!loadingUpdate && isUpdated) {
      dispatch(resetUpdateHospital());
      navigate("/hospitals/" + id);
      alert.success("updated hospital Successfully");
    }
    if (errorHospital) {
      console.log(errorHospital);
      alert.error(errorHospital);
      dispatch(clearErrorsHospital());
    }
    if (hospital === null || !hospital.name) {
      dispatch(getHospitalbyID(id));
    }
    if (errorUpdate) {
      console.log(errorUpdate);
      alert.error(errorUpdate);
      dispatch(clearErrors());
    } else if (hospital !== null && hospital.name) {
      setHName(hospital.name);
      setHAddress(hospital.address);
      setGst(hospital.GST);
      setDesclaimer(hospital.desclaimer);
      setTandc(hospital.termsAndConditions);
      setAdmin(hospital.admin);
    }
  }, [
    dispatch,
    errorHospital,
    hospital,
    isUpdated,
    errorUpdate,
    loadingHospital,
    loadingUpdate,
  ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

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
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </FormControl>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
};

export default Create_Hospitals;
