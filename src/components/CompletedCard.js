import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography, makeStyles, Avatar } from '@material-ui/core';
import { yellow, green, pink, blue, red, grey } from '@material-ui/core/colors';
import SimpleMenu from './MenuBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 5,
      borderRadius: 3,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 3,
      backgroundColor: '#2bbd46',
    },
  }))(LinearProgress);
   

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



const useStyles = makeStyles( (theme) => ({
    
    avatar:{
        background: (note) => {
            if(note.category == 'todo'){
                return grey[700]
            }
            if(note.category == 'in progress'){
                return yellow[500]
            }
            if(note.category == 'completed'){
                return green[500]
            }
            return blue[500]
        }
    },
    br:{
        color: green,
        background: yellow
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    set:{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px'
    },
    icon:{
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    divv:{
        display: 'flex',
        flexDirection: 'row'
    },
        prop:{
            height: '300px',
            width: '350px',
            minWidth: '300px'
        },

}))


export default function CompletedCard({ note, handleDeleteCompleted }) {
    const classes = useStyles(note);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className={classes.prop}>

            <Card elevation={2}>
                <CardHeader
                avatar={
                    <Avatar className={classes.avatar}> 
                        {note.category[0].toUpperCase()}
                    </Avatar>
                } 
                action={
                    <SimpleMenu note = {note} handleDelete={handleDeleteCompleted} />
                  }
                  title={note.category}
                />
                <CardContent>
                    <CardActionArea variant="outlined" color="primary" onClick={handleClickOpen}>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="h6">18 Jul</Typography>
                <br />
                <Typography variant="h6">100% Complete</Typography>
            
                <BorderLinearProgress variant="determinate" value={100} />
                </CardActionArea>
                </CardContent>
                <CardActions>
                    <div className={classes.set}>
                        <Typography >Owner</Typography>
                        <Typography >{note.owner}</Typography>
                        </div>
                    <div className={classes.set}>
                        <Typography >Duration</Typography>
                        <Typography >{note.duration}</Typography>
                        </div>
                </CardActions>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                  <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Project title : {note.title}
                  </DialogTitle>
                  <DialogContent dividers>
                      <Typography>
                          Category: {note.category}
                      </Typography>
                      <Typography>
                          Owner: {note.owner}
                      </Typography>
                      <Typography>
                          Duration : {note.duration}
                      </Typography>
                      <Typography>
                          Details about the project : 
                      </Typography>

                    <Typography gutterBottom>
                      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                      lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                      Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                      scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                      auctor fringilla.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>
            </Card>
        </div>
    )
}