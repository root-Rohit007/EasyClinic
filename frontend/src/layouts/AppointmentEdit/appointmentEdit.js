import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import {
  Grid,
  InputLabel,
  NativeSelect,
  Paper,
  Stack,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useAlert } from "react-alert";

const AppointmentUpdate = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { appointmentid } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doc, setDoc] = useState({});
  const [patient, setPatient] = useState({});
  const [value, setValue] = React.useState(new Date());
  const [currentHeight, setCurrentHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [temp, setTemp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bp, setBp] = useState("");
  const [status, setStatus] = useState("");
  const [creatorID, setCreatorID] = useState("");

  const paperStyle = {
    padding: "10px 10px",
    width: 600,
    margin: "20px auto",
  };

  const handleChange = (event) => {
    const val = event.target.value;
    setDoc(val);
  };

  const handleDChange = (newValue) => {
    setValue(newValue);
  };

  const hospitalID = useSelector((state) => state.user.user.hospitalID);
  const updatorID = useSelector((state) => state.user.user._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/v2/getAllDoctors/${hospitalID}`);
        const res2 = await axios.get(
          `/api/v5/getAppointmentByID/${appointmentid}`
        );

        setAppointment(res2.data.appointment);

        console.log(res2.data.appointment);
        const data = res1.data.doctors;
        data.unshift("");
        setDoctors(data);

        const data2 = res2.data.appointment;

        setDoc(data2.doctorID._id);
        setPatient(data2.patientID._id);
        setValue(data2.date);
        setCurrentHeight(data2.currentHeight);
        setCurrentWeight(data2.currentWeight);
        setTemp(data2.temp);
        setBp(data2.bp);
        setStatus(data2.Staus);
        setSpo2(data2.spo2);
        setCreatorID(updatorID);
      } catch (error) {
        console.log(error);
        alert.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "put",
        url: `/api/v5/updateAppointment/${appointment._id}`,
        data: {
          creatorID,
          hospitalID,
          patientID: appointment.patientID._id,
          doctorID: doc,
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
      console.log(res.data);
      alert.success("updated sucessfully");
      navigate(
        `/patients/${appointment.patientID._id}/appointment_details/${appointment._id}`
      );
    } catch (error) {
      console.log(error);
      alert.error(error);
    }
  };

  if (appointment) {
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
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
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
                    update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }
};

export default AppointmentUpdate;
