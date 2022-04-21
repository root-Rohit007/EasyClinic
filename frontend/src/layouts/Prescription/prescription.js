import { Paper } from "@material-ui/core";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { medicines } from "../../Data/medicines.js";
import AddchartIcon from "@mui/icons-material/Addchart";
import MDTypography from "components/MDTypography/index.js";
import DeleteIcon from "@mui/icons-material/Delete";
import MDButton from "components/MDButton";
import { useAlert } from "react-alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Prescription = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { appointmentid } = useParams();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [medicine, setMedicine] = useState("");
  const [manual, setManual] = useState(false);
  const [qty, setQty] = useState();
  const [morning, setMorning] = useState("No Dose");
  const [afternoon, setAfternoon] = useState("No Dose");
  const [evening, setEvening] = useState("No Dose");
  const [morningText, setMorningText] = useState("");
  const [afternoonText, setAfternoonText] = useState("");
  const [eveningText, setEveningText] = useState("");
  const [appointment, setApointment] = useState({});
  const [reason, setReason] = useState("");
  const [disease, setDisease] = useState("");
  const [lineTreatment, setLineTreatment] = useState("");
  const [procedure, setProcedure] = useState("");
  const [fees, setFees] = useState();

  const [pres, setPres] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/v5/getAppointmentByID/${appointmentid}`
      );
      setApointment(res.data.appointment);
      if (res.data.appointment.prescription) {
        setPres(res.data.appointment.prescription);
      }
      setReason(res.data.appointment.reason);
      setDisease(res.data.appointment.disease);
      setLineTreatment(res.data.appointment.lineTreatment);
      setProcedure(res.data.appointment.procedure);
      setFees(+res.data.appointment.fees);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...medicines]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSubmit = (e) => {
    console.log("added");
    e.preventDefault();

    setPres([
      ...pres,
      {
        medicine,
        qty,
        morning,
        morningText,
        afternoon,
        afternoonText,
        evening,
        eveningText,
      },
    ]);
    setMedicine("");
    setQty("");
    setMorningText("");
    setAfternoonText("");
    setEveningText("");
  };

  const removePres = (index) => {
    const newPres = [...pres];
    newPres.splice(index, 1);
    setPres(newPres);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(
        `/api/v5/update/${appointmentid}`,
        {
          reason,
          disease,
          lineTreatment,
          procedure,
          fees,
          prescription: pres,
          Status: "completed",
        },
        config
      );
      console.log(res.data.appointment);
      alert.success("Updated");
      navigate(
        `/patients/${appointment.patientID._id}/appointment_details/${appointment._id}/pdf`
      );
    } catch (err) {
      alert.error(err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper style={{ margin: "20px" }}>
        <Box sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label="The reason of patients visit "
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label=" Cause of the disease"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={5} lg={5}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label=" Line of Treatment "
                  value={lineTreatment}
                  onChange={(e) => setLineTreatment(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={5} lg={5}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label="Clinical Procedure if any"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <small>Fees:</small>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={2} md={2} lg={1}>
                <IconButton
                  color="primary"
                  aria-label="Manual add"
                  component="span"
                  onClick={() => setManual(!manual)}
                >
                  <AddchartIcon />
                </IconButton>
              </Grid>

              {/* medicine */}
              <Grid item xs={10} md={6} lg={9}>
                {manual ? (
                  <TextField
                    type={"text"}
                    variant="outlined"
                    fullWidth
                    label="Enter medicine"
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                    required
                  />
                ) : (
                  <Autocomplete
                    id="asynchronous-demo"
                    // sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.Medicine === value.Medicine
                    }
                    getOptionLabel={(option) => option.Medicine}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        label="Search Medicine"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        value={medicine}
                        onSelect={(e) => setMedicine(e.target.value)}
                        required
                      />
                    )}
                  />
                )}
              </Grid>
              {/* Qty */}
              <Grid item xs={12} md={4} lg={2}>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  label="Qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              {/* morning */}
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label="Morning"
                  value={morningText}
                  onChange={(e) => setMorningText(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="select"
                  value={morning}
                  onChange={(e) => setMorning(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  required
                  fullWidth
                >
                  <option value={"before breakfast"}>before breakfast</option>
                  <option value={"after breakfast"}>after breakfast</option>
                  <option value={"No Dose"}>no dose</option>
                </TextField>
              </Grid>

              {/* Afternoon */}
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label="Afternoon"
                  value={afternoonText}
                  onChange={(e) => setAfternoonText(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="select"
                  value={afternoon}
                  onChange={(e) => setAfternoon(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  required
                  fullWidth
                >
                  <option value={"before lunch"}>before lunch</option>
                  <option value={"after lunch"}>after lunch</option>
                  <option value={"No Dose"}>no dose</option>
                </TextField>
              </Grid>

              {/* Lunch */}
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label="Evening"
                  value={eveningText}
                  onChange={(e) => setEveningText(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="select"
                  value={evening}
                  onChange={(e) => setEvening(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  required
                  fullWidth
                >
                  <option value={"before dinner"}>before dinner</option>
                  <option value={"after dinner"}>after dinner</option>
                  <option value={"No Dose"}>no dose</option>
                </TextField>
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  style={{ color: "white" }}
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>

      {/* Prescription */}
      {pres.length > 0 ? (
        <Paper style={{ margin: "20px" }}>
          <Box sx={{ padding: "30px" }}>
            <Grid container spacing={1}>
              <Grid Grid item xs={1}>
                <MDTypography variant="body2" fontWeight="bold" color="inherit">
                  Index
                </MDTypography>
              </Grid>
              <Grid item xs={3} pr={3}>
                <MDTypography fontWeight="bold" color="inherit" variant="body2">
                  Medicine
                </MDTypography>
              </Grid>

              <Grid item xs={6} textAlign="center">
                <MDTypography fontWeight="bold" color="inherit" variant="body2">
                  Dose
                </MDTypography>
              </Grid>

              <Grid item xs={1}>
                <MDTypography fontWeight="bold" color="inherit" variant="body2">
                  Qty
                </MDTypography>
              </Grid>

              <Grid item xs={1}>
                <MDTypography
                  fontWeight="bold"
                  color="inherit"
                  variant="body2"
                  verticalAlign="bottom"
                >
                  delete
                </MDTypography>
              </Grid>

              {pres.map((p, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <Grid container>
                      <Grid item xs={1}>
                        <MDTypography
                          variant="body2"
                          fontWeight="light"
                          color="inherit"
                        >
                          {i + 1}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={3} pr={3}>
                        <MDTypography
                          fontWeight="light"
                          color="inherit"
                          variant="body2"
                        >
                          {p.medicine}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography
                          fontWeight="light"
                          color="inherit"
                          variant="body2"
                        >
                          {p.morning + " - " + p.morningText}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography
                          fontWeight="light"
                          color="inherit"
                          variant="body2"
                        >
                          {p.afternoon + " - " + p.afternoonText}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography
                          fontWeight="light"
                          color="inherit"
                          variant="body2"
                        >
                          {p.evening + " - " + p.eveningText}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={1}>
                        <MDTypography
                          fontWeight="light"
                          color="inherit"
                          variant="body2"
                          verticalAlign="bottom"
                        >
                          {p.qty}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          component="span"
                          style={{ marginTop: -10 }}
                          onClick={() => removePres(i)}
                          // onClick={() => setManual(!manual)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid xs={12} align="center" mt={3}>
              <MDButton
                variant="contained"
                color="primary"
                onClick={(e) => submit(e)}
              >
                Submit
              </MDButton>
            </Grid>
          </Box>
        </Paper>
      ) : (
        <div></div>
      )}
    </DashboardLayout>
  );
};

export default Prescription;
