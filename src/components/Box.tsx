import React, { FC } from 'react';
import withStyles, { WithStyles } from 'react-jss';

interface Props extends WithStyles<typeof styles> {}

const Cell: FC<Props> = ({ classes }) => <div className={classes.box} />;

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid black',
    width: '100px',
    height: '100px',
    cursor: 'pointer',
  },
};

export default withStyles(styles)(Cell);
