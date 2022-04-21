import React, { useEffect, useState } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Grid, Button } from "@material-ui/core";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from '@mui/material/Divider';

import OpenSans from "Fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf";
import OpenSansB from "Fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf";

import img from "assets/rx.png";

Font.register({
  family: "opensans",
  fonts: [{ src: OpenSans }, { src: OpenSansB, fontStyle: "bold" }],
});
const borderColor = "#b0b5b5";
// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "opensans",
    backgroundColor: "white",
    fontSize: 10,
    lineHeight: 2,
  },
  section1: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  address_width: {
    width: 200,
  },
  section2: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  section3: {
    margin: 5,
    padding: 5,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#b0b5b5",
  },
  section4: {
    marginTop: 20,
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  section5: {
    marginTop: 20,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  section6: {
    marginTop: 20,
    paddingLeft: 10,
    paddingTop: 4,
    backgroundColor: "#b0b5b5",
    fontStyle: "bold",
  },

  headers: {
    fontStyle: "bold",
  },

  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#b0b5b5",
    width: "100%",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#b0b5b5",
    backgroundColor: "#b0b5b5",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    flexGrow: 1,
  },
  index: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontStyle: "bold",
  },
  description: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontStyle: "bold",
  },
  preferance: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontStyle: "bold",
  },
  preferance2: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontStyle: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#b0b5b5",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
  },
  indexrow: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
  },
  descriptionrow: {
    width: "30%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  preferancerow: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 2,
  },
  preferancerow2: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 2,
  },
});

// Create Document Component
const Pdf = () => {
  const alert = useAlert();
  const { appointmentid } = useParams();
  const [appointment, setApointment] = useState(null);
  const [pres, setPres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/api/v5/getAppointmentByID/${appointmentid}`
      );
      setApointment(res.data.appointment);
      console.log(res.data.appointment);
      if (res.data.appointment.prescription) {
        setPres(res.data.appointment.prescription);
      }
    };

    fetchData();
  }, []);

  if (appointment) {
    const datestr = new Date(appointment.date);
    const timestr = datestr.toTimeString().split(" ")[0];

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              style={{
                backgroundColor: "green",
                color: "white",
                margin: "5px",
              }}
            >
              <a
                href={`https://api.whatsapp.com/send/?phone=91${appointment.patientID.phone}&text=Thank you for your visit, please find below prescription&app_absent=0`}
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
                rel="noreferrer"
              >
                Ping on whatsapp
              </a>
            </Button>
          </Grid>
        </Grid>
        <PDFViewer width="100%" height="900">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.top}>
                <View style={styles.section1}>
                  <Text style={styles.headers}>
                    {appointment.hospitalID.name.toUpperCase()}
                  </Text>
                  <Text style={styles.address_width}>
                    {appointment.hospitalID.address}
                  </Text>
                </View>
                <View style={styles.section2}>
                <Text style={{fontStyle: "bold", color: "#4254f5"}}>
                    {appointment.doctorID.name.toUpperCase()}
                  </Text>
                  <Text>{appointment.doctorID.degree.toString()}</Text>
                  <Text>{appointment.doctorID.email}</Text>
                  <Text>{appointment.doctorID.phone}</Text>
                </View>
              </View>
              <Text style={{padding: 10, textAlign: "right", fontStyle: "bold"}}>Case Paper No: {appointment.patientID.casePaperNo}</Text>
              <View style={styles.section3}>
                <Text>
                  <p style={{ fontStyle: "bold" }}>Name</p>:&nbsp;&nbsp;
                  {appointment.patientID.name.toUpperCase()} ({" "}
                  {appointment.patientID.age} yr ) -{" "}
                  {appointment.patientID.phone}
                </Text>
                <Text>
                  <p style={{ fontStyle: "bold" }}>Date</p>:&nbsp;&nbsp;
                  {datestr.toDateString()}&nbsp;&nbsp;
                  <p style={{ fontStyle: "bold" }}>Time</p>:&nbsp;&nbsp;
                  {timestr}
                </Text>
              </View>
              <View style={styles.section4}>
                <Text>
                  <p style={{ fontStyle: "bold" }}>BP</p>:&nbsp;&nbsp;
                  {appointment.bp ? appointment.bp : "   "} mmHg &nbsp; &nbsp;
                  <p style={{ fontStyle: "bold" }}>Weight</p>: &nbsp;&nbsp;
                  {appointment.currentWeight
                    ? appointment.currentWeight
                    : "   "}{" "}
                  Kg &nbsp; &nbsp;
                  <p style={{ fontStyle: "bold" }}>Height</p>: &nbsp;&nbsp;
                  {appointment.currentHeight
                    ? appointment.currentHeight
                    : "   "}{" "}
                  cm &nbsp; &nbsp;
                  <p style={{ fontStyle: "bold" }}>SPO2</p>: &nbsp;&nbsp;
                  {appointment.spo2 ? appointment.currentWeight : "   "} %
                  &nbsp; &nbsp;
                  <p style={{ fontStyle: "bold" }}>Temperature</p>: &nbsp;&nbsp;
                  {appointment.temp ? appointment.currentWeight : "   "} F
                  &nbsp; &nbsp;
                </Text>
                <Text style={{paddingTop: 5}}>
                  <p style={{ fontStyle: "bold" }}>
                    1. The reason of patients visit{" "}
                  </p>
                  :&nbsp;&nbsp;
                  {appointment.reason ? appointment.reason : "NA"}
                </Text>
                <Text>
                  <p style={{ fontStyle: "bold" }}>2. Cause of the disease </p>
                  :&nbsp;&nbsp;
                  {appointment.disease ? appointment.disease : "NA"}
                </Text>

                <Text>
                  <p style={{ fontStyle: "bold" }}>3. Line of Treatment</p>
                  :&nbsp;&nbsp;
                  {appointment.lineTreatment
                    ? appointment.lineTreatment
                    : "NA"}
                </Text>

                <Text>
                  <p style={{ fontStyle: "bold" }}>
                    4. Any Procedure taken in clinic{" "}
                  </p>
                  :&nbsp;&nbsp;
                  {appointment.procedure ? appointment.procedure : "NA"}
                </Text>
              </View>

              <View style={{ paddingLeft: "20px" }}>
                <Image src={img} style={{ height: "15px", width: "15px" }} />
              </View>

              {/* Table */}
              <View style={styles.tableContainer}>
                <View style={styles.container}>
                  <Text style={styles.index}>Index</Text>
                  <Text style={styles.description}>Medicine </Text>
                  <Text style={styles.preferance}>Dose</Text>
                  <Text style={styles.preferance2}>Qty</Text>
                </View>
              </View>
              {/* Table - Rows */}
              {appointment.prescription ? (
                appointment.prescription.map((r, index) => (
                  <View style={styles.row}>
                    <Text style={styles.indexrow}>{index + 1}</Text>
                    <Text style={styles.descriptionrow}>{r.medicine}</Text>
                    <Text style={styles.preferancerow}>
                      [{r.morningText + "-" + r.morning}]- [
                      {r.afternoonText + "-" + r.afternoon}]- [
                      {r.eveningText + "-" + r.evening}]
                    </Text>
                    <Text style={styles.preferancerow2}>{r.qty}</Text>
                  </View>
                ))
              ) : (
                <Text>No prescriptions</Text>
              )}
              <View style={styles.section5}>
                <Text style={{ fontStyle: "bold" }}>
                  {appointment.doctorID.name}
                </Text>
                <Text>{appointment.doctorID.degree.toString()}</Text>
              </View>
              <Divider light />
              <View style={styles.section6}>
                <Text>
                  For Official Use:
                </Text>
              </View>
              <Text style={{ padding: 10, fontSize: 15 }}>
                 1. Fees = {appointment.fees}/-
              </Text>
            </Page>
          </Document>
        </PDFViewer>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <h1>loading...</h1>
      </DashboardLayout>
    );
  }
};

export default Pdf;
