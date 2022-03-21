import axios from "axios";
import Select from "react-select";
import React, { Component } from "react";
import { connect } from "react-redux";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      name: "",
    };
  }

  async getOptions() {
    const res = await axios.get(
      `/api/v2/getAllDoctors/${this.props.hospitalID}`
    );
    console.log("res", res);
    const data = res.data.doctors;

    const options = data.map((d) => ({
      value: d._id,
      label: d.name,
    }));
    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
  }

  componentDidMount() {
    this.getOptions();
  }

  render() {
    return (
      <div
        style={{
          marginLeft: "70px",
          marginRight: "70px",
          marginTop: "30px",
        }}
      >
        <Select
          options={this.state.selectOptions}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hospitalID: state.user.user.hospitalID,
});

export default connect(mapStateToProps)(Dropdown);
