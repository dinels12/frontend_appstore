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
import { useMutation, gql } from "@apollo/client";

const USER_DELETED = gql`
  mutation userDeleted($id: ID) {
    deleteUser(_id: $id) {
      message
    }
  }
`;

const USER_UPDATE = gql`
  mutation userUpdate($id: ID, $input: userInput) {
    updateUser(_id: $id, input: $input) {
      nick
      name
      lastname
      banned
      role
    }
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UsersData({ users }) {
  const classes = useStyles;
  const [userDeleted] = useMutation(USER_DELETED);
  const [userUpdate] = useMutation(USER_UPDATE);

  return (
    <TableContainer component={Paper} className='mt-2'>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nick</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell align='center'>Role</TableCell>
            <TableCell align='center'>Last Login</TableCell>
            <TableCell align='center'>Edit</TableCell>
            <TableCell align='center'>Ban</TableCell>
            <TableCell align='center'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(
            ({ _id, nick, name, lastname, role, lastLogin, banned }) => (
              <TableRow key={_id}>
                <TableCell component='th' scope='row'>
                  {nick}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{lastname}</TableCell>
                <TableCell align='center'>{role}</TableCell>
                <TableCell align='center'>{lastLogin}</TableCell>
                <TableCell align='center'>
                  <Button color='primary'>Edit</Button>
                </TableCell>
                <TableCell align='center'>
                  {banned ? (
                    <Button
                      onClick={() => {
                        const r = window.confirm("Unban User?");
                        if (r) {
                          userUpdate({
                            variables: {
                              id: _id,
                              input: {
                                banned: false,
                              },
                            },
                          });
                        }
                      }}
                      color='secondary'
                      variant='contained'
                    >
                      YES
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const r = window.confirm("Ban User?");
                        if (r) {
                          userUpdate({
                            variables: {
                              id: _id,
                              input: {
                                banned: true,
                              },
                            },
                          });
                        }
                      }}
                      color='primary'
                      variant='contained'
                    >
                      NO
                    </Button>
                  )}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    onClick={() => {
                      const r = window.confirm("Delete User?");
                      if (r) {
                        userDeleted({ variables: { id: _id } });
                      }
                    }}
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
