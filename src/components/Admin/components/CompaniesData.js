import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
// import { useMutation, gql } from "@apollo/client";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CompaniesData({ companies }) {
  const classes = useStyles;
  return (
    <TableContainer component={Paper} className='mt-2'>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nick</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align='center'>Description</TableCell>
            <TableCell align='center'>Active</TableCell>
            <TableCell align='center'>Plan</TableCell>
            <TableCell align='center'>MaxProduct</TableCell>
            <TableCell align='center'>ExpiredDate</TableCell>
            <TableCell align='center'>Edit</TableCell>
            <TableCell align='center'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map(
            ({
              _id,
              nick,
              name,
              location,
              description,
              ownerId,
              active,
              plan,
              maxProductActive,
              expiredPlanDate,
            }) => (
              <TableRow key={_id}>
                <TableCell component='th' scope='row'>
                  {nick}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell align='center'>
                  {active ? (
                    <Button color='secondary' variant='contained'>
                      YES
                    </Button>
                  ) : (
                    <Button color='primary' variant='contained'>
                      NO
                    </Button>
                  )}
                </TableCell>
                <TableCell align='center'>{plan}</TableCell>
                <TableCell align='center'>{maxProductActive}</TableCell>
                <TableCell align='center'>{expiredPlanDate}</TableCell>
                <TableCell align='center'>
                  <Button color='primary'>Edit</Button>
                </TableCell>

                <TableCell align='center'>
                  <Button
                    color='secondary'
                    variant='contained'
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
