import React from 'react'
import { makeStyles} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import  AppBar  from '@material-ui/core/AppBar';
import  Toolbar  from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => {
    return {
        page:{
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawerPaper:{
            //width : drawerWidth,
        },
        root: {
            display: 'flex'
        },
        active:{
            background: '#f4f4f4'
        },
        title:{
            padding: theme.spacing(2)
        },
        
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: '1',
            marginLeft: '50px'
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
    
})

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      '&:hover': {
        backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
      },
    },
  }))(Button);

export default function Layout({children}) {
    const classes = useStyles();
    const history = useHistory();

    return (

        
        // Side drawer

        <div className={classes.root}>

            <AppBar
            className={classes.appbar}
            elevation={0}
            >
                <Toolbar className={classes.active}>
                    <Typography variant='h4' >My App</Typography>
                </Toolbar>
                <Toolbar className={classes.active}>
                    <Typography variant='h5' className={classes.date}>
                        Client Progress
                    </Typography>
                    <ColorButton 
                    type='submit'
                    variant="contained" 
                    color="primary" 
                    className={classes.margin}
                    onClick={() => history.push('/create')}
                    >
                        Add a new Client
                        <AddCircleOutlined />
                    </ColorButton>
                </Toolbar>
            </AppBar>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
            {children}
            </div>
        </div>
    )
}
