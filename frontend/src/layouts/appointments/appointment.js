import "date-fns";
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";

import NativeSelect from "@mui/material/NativeSelect";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

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
    const doctorID = doc[0];
    const doctorName = doc[1];
    const patientName = patient.name;

    console.log(
      creatorID,
      hospitalID,
      patientID,
      doctorID,
      value,
      doctorName,
      patientName
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
          doctorName,
          patientName,
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

    // axios
    //   .post("/api/v5/registerAppointment", {
    //     hospitalID,
    //     patientID,
    //     doctorID,
    //     creatorID,
    //     value,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     console.log("Registered appointment");
    //   })
    //   .catch((err) => {
    //     console.log("Error : ", err);
    //     alert.error(err);
    //   });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid align="center">
        <Paper elevation={20} style={paperStyle}>
          <h2 style={{ marginBottom: "30px" }}>Set - Appointment</h2>

          <form onSubmit={handleSubmit}>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                id="time-picker"
                label="Date and time"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider> */}

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

            {/* <Dropdown /> */}

            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "30px",
              }}
            >
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
                    <option key={d._id} value={d._id + "," + d.name}>
                      {d.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </div>

            <Button
              style={{ marginTop: "30px" }}
              type="submit"
              variant="contained"
              color="inherit"
            >
              submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </DashboardLayout>
  );
}

export default Appointment;
