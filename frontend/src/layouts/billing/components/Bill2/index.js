
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "../../../../context";

function Bill({
  name,
  address,
  GST,
  desclaimer,
  termsAndConditions,
  admin,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {name}
          </MDTypography>

          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              {/* Delete */}
              {/* <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton> */}
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={(e) => console.log("hello")}
            >
              <Icon>edit</Icon>&nbsp;Get-Admin-Details
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Address:&nbsp;&nbsp;&nbsp;
            <MDTypography
              variant="caption"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {address}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            GST:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {GST}
            </MDTypography>
          </MDTypography>
        </MDBox>
        {desclaimer ? (
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Desclaimer:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {desclaimer}
              </MDTypography>
            </MDTypography>
          </MDBox>
        ) : (
          " "
        )}
        {termsAndConditions ? (
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Terms and Conditions:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {termsAndConditions}
              </MDTypography>
            </MDTypography>
          </MDBox>
        ) : (
          " "
        )}
        {/* <MDTypography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {vat}
          </MDTypography>
        </MDTypography> */}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
