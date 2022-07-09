import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const getUsers = () =>
  axios.get(config.SERVER_URL + `/api/admin/users`).then((res) => res.data);
const promoteRequest = (UID) =>
  axios
    .post(config.SERVER_URL + `/api/admin/promote`, UID)
    .then((res) => res.data);
const demoteRequest = (UID) =>
  axios.post(config.SERVER_URL + `/admin/api/demote`, UID).then((res) => res.data);


class AdminPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    this.transformData = this.transformData.bind(this);
    this.promote = this.promote.bind(this);
    this.demote = this.demote.bind(this);
  }

  componentDidMount() {
    getUsers().then((res) => {
      console.log(res);
      const data = this.transformData(res);
      this.setState({
        data,
        loading: false,
      });
    });
  }


  transformData(data) {
    return data.allUsers.map((x) => ({
      userId: x._id,
    }));
  }

  promote(someone) {
    console.log("you just got promoted! :P");
    console.log(someone);
    promoteRequest({ id: someone }).then((data) => console.log(data));
    window.location.reload();
  }

  demote(someone) {
    console.log("you just got demoted~ :(");
    console.log(someone);
    demoteRequest({ id: someone }).then((data) => console.log(data));
    window.location.reload();
  }


  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h1 style={{ margin: "1em" }}>Admin Page</h1>
        <Button>
          {" "}
          <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
            {" "}
            Home{" "}
          </NavLink>{" "}
        </Button>
        <h2 style={{ margin: "1.2em" }}>Staff List</h2>
        <div style={{ margin: "1.7em" }}>
          {/* {CreateTable(
            this.state.data,
            ["email"],
            this.promote,
            undefined,
            this.demote
          )} */
          /*TODO: use createTable from ant design */}
        </div>
      </>
    );
  }
}

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 1em;
  cursor: pointer;
  margin-left: 2em;
`;

export default AdminPage;
