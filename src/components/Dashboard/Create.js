import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Modal from 'react-modal';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import config from '../../config';

// Component declaration

const Create = (props) => {
  
  const [projects, setProjects] = useState([]);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  useEffect(() => {
    function getProject() {
      axios
        .get(config.SERVER_URL + '/api/projects/')
        .then((res) => setProjects(res.data))
        .catch((err) => console.log(err));
    }
    getProject();
  }, []);

  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      {/* <Tabs orientation="vertical"> */}
        <Tab
          icon={<AddToPhotosIcon />}
          label="Create Project"
          onClick={() => setCreateProjectModalOpen(true)}
        >
          Create Project
        </Tab>
      {/* </Tabs> */}

      <Modal
        isOpen={createProjectModalOpen}
        onRequestClose={() => setCreateProjectModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        <button onClick={() => setCreateProjectModalOpen(false)}>Cancel</button>
        <Formik
          initialValues={{ projectName: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.projectName)
              errors.projectName = 'Project Name required';
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(config.SERVER_URL + '/api/projects/create', {
                name: values.projectName,
              })
              .then((res) => {
                alert(`Project ${values.projectName} successfully created!`);
                setProjects((prevState) => [...prevState, res.data.project]);
                setCreateProjectModalOpen(false);
                setSubmitting(false);
              })
              .catch((err) => {
                alert(err);
              });
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <input
                name="projectName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div>{formik.errors.projectName}</div>
              ) : null}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

// styled components declaration

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 2em;
  cursor: pointer;
`;

export default Create;
