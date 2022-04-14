import "date-fns";
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Paper, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { useAlert } from "react-alert";

import { useParams, useNavigate } from "react-router-dom";

const paperStyle = {
  padding: "10px 10px",
  width: 600,
  margin: "20px auto",
};

function Appointment() {
  const navigate = useNavigate();
  const alert = useAlert();

  const [doctors, setDoctors] = useState([]);
  const [doc, setDoc] = useState({});
  const [patient, setPatient] = useState({});
  const [value, setValue] = React.useState(new Date());
  const [currentHeight, setCurrentHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [temp, setTemp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bp, setBp] = useState("");
  const [status, setStatus] = useState("pending");

  const { id } = useParams();

  const hospitalID = useSelector((state) => state.user.user.hospitalID);
  const creatorID = useSelector((state) => state.user.user._id);

  const handleChange = (event) => {
    const val = event.target.value.split(",");
    setDoc(val);
  };

  const handleDChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get(`/api/v2/getAllDoctors/${hospitalID}`);
      const res2 = await axios.get(`/api/v4/patient/${id}`);
      const data2 = res2.data.patient;
      const data = res.data.doctors;
      data.unshift("");
      setDoctors(data);
      setPatient(data2);
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientID = id;
    const doctorID = doc;

    console.log(
      creatorID,
      hospitalID,
      patientID,
      doctorID,
      value,

      currentHeight,
      currentWeight,
      temp,
      spo2,
      bp,
      status
    );

    try {
      const res = await axios({
        method: "post",
        url: "/api/v5/registerAppointment",
        data: {
          creatorID,
          hospitalID,
          patientID,
          doctorID,
          date: value,
          currentHeight,
          currentWeight,
          temp,
          spo2,
          bp,
          Status: status,
        },
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      alert.success("Appointment created successfully..!!!");
      navigate(`/patients/${id}/appointment_details`);
    } catch (error) {
      console.log("error : ", error.response.data.error);
      alert.error(error.response.data.error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid align="center">
        <Paper elevation={20} style={paperStyle}>
          <h2 style={{ marginBottom: "30px" }}>Set - Appointment</h2>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={5}>
                    <DateTimePicker
                      label="Date&Time picker"
                      value={value}
                      onChange={handleDChange}
                      renderInput={(params) => <TextField {...params} />}
                      ampm={false}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Select Doctor
                  </InputLabel>
                  <NativeSelect
                    value={doc}
                    inputProps={{
                      name: "doctor",
                      id: "uncontrolled-native",
                    }}
                    onChange={handleChange}
                  >
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Height"
                  variant="outlined"
                  placeholder="Enter height in cm"
                  value={currentHeight}
                  onChange={(e) => setCurrentHeight(e.target.value)}
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
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Temperature"
                  variant="outlined"
                  placeholder="Enter temp in deg cel"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="SPO2"
                  variant="outlined"
                  placeholder="Enter spo2"
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="text"
                  fullWidth
                  label="bp"
                  variant="outlined"
                  placeholder="Enter bp"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Status"
                  // value={currency}
                  // onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={"pending"}>Pending</option>
                  <option value={"completed"}>Completed</option>
                  <option value={"rejected"}>Rejected</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  style={{ marginTop: "30px" }}
                  type="submit"
                  variant="contained"
                  color="inherit"
                >
                  submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
}

export default Appointment;
