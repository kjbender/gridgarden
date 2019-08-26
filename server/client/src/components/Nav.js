import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import blueberry from '../icons/blueberry.svg';

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0px;
`;

// zIndex: 1,
// overflow: 'auto',
// position: 'relative',
// display: 'flex',
// width: '100%',
// zIndex: theme.zIndex.drawer + 1,

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
 
  },
  appBar: {
    backgroundColor: '#121c60'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    color: '#c5cae9'
  },
  icon: {
    margin: theme.spacing(0),
    padding: theme.spacing(1)
  },
}));

function Nav(props) {
  const { children } = props;
  const classes = useStyles();
  //const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Avatar src={blueberry} alt="" />
          <Typography variant="h6" noWrap className={classes.title}>
             Grid Garden
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(connect()(Nav)); 