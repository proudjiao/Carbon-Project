import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { mediaQueries } from '../../shared/config';
import config from '../../config';

import axios from 'axios';

//material UI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

/**
 * Component Declaration
 */
export default function Project(props) {
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const history = useHistory();

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

  const { data } = props;

  const handleDeleteProject = (id) => {
    axios
      .delete(config.SERVER_URL + `/api/projects/${id}`)
      .then((res) => {
        alert(res.data);
        props.handleUpdateProject();
        setDeleteProjectModalOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      {/* <TableContainer component={Paper}>
      <Table  aria-label="simple table"> */}

      <TableRow>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data.status}</TableCell>
        <TableCell>
          
          <Button size="small" variant="outlined" onClick={() => history.push(`/edit/${data['_id']}`)}>
            Edit
          </Button>


        </TableCell>
        <TableCell>
          <Button size="small" color="error" variant="outlined" onClick={() => setDeleteProjectModalOpen(true)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {/* </Table>
    </TableContainer> */}
      <Modal
        isOpen={deleteProjectModalOpen}
        onRequestClose={() => setDeleteProjectModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        <p>Are you sure you want to delete this project?</p>
        <button onClick={() => setDeleteProjectModalOpen(false)}>Cancel</button>
        <button onClick={() => handleDeleteProject(data['_id'])}>Delete</button>
      </Modal>
    </>
  );
}

/**
 * Styled components declaration
 */
const ProjectContainer = styled.div`
  width: 80%;
  margin: auto;
  ${mediaQueries.tablet} {
    width: 90%;
  }
  ${mediaQueries.mobile} {
    width: 80%;
  }
`;

const TestPreview = styled.div`
  height: 400px;
  background: #bbbbbb;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px 5px 0 0;
  color: gray;
`;

const Description = styled.div`
  border-radius: 0 0 5px 5px;
  color: white;
  padding: 0.5em 1em 1.5em 1em;
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
