import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import TodoCard from '../components/TodoCard'
import InProgressCard from '../components/InProgressCard'
import CompletedCard from '../components/CompletedCard'
import AlbumRoundedIcon from '@material-ui/icons/AlbumRounded';
import { Typography, makeStyles, withStyles } from '@material-ui/core';
import { green, red, grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  a:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '50px',

  },
  b:{
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    marginBottom: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    

  },
  divv:{
    display: 'flex' ,

    width: '350px',
    minWidth: '300x',
    height: '30px',
    background: green,
    flexDirection: 'row',
    marginLeft: '25px',
  },
  icon:{
    background: red,

    color: green,


  }
});

const TodoIcon = withStyles((theme) => ({
  root: {
    color: "#92a696",
    paddingRight: "10px",
  },
}))(AlbumRoundedIcon);

const InProgressIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.light,
    paddingRight: "10px",
  },
}))(AlbumRoundedIcon);

const CompletedIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.success.light,
    paddingRight: "10px",

  },
}))(AlbumRoundedIcon);

export default function Notes() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/notes')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])
  useEffect(() => {
    fetch('http://localhost:8002/notes')
      .then(res => res.json())
      .then(data => setInprogress(data))
  }, [])
  useEffect(() => {
    fetch('http://localhost:8003/notes')
      .then(res => res.json())
      .then(data => setCompleted(data))
  }, [])


  const handleDeleteTodo = async (id) => {
    await fetch('http://localhost:8001/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = todos.filter(note => note.id != id)
    setTodos(newNotes)
  }

  const handleDeleteInProgress = async (id) => {
    await fetch('http://localhost:8002/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = inprogress.filter(note => note.id != id)
    setInprogress(newNotes)
  }

  const handleDeleteCompleted = async (id) => {
    await fetch('http://localhost:8003/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = completed.filter(note => note.id != id)
    setCompleted(newNotes)
  }

  return (
    <Container>
      <div className={classes.a}>
        <div
          >
            <div className={classes.divv}>
                <TodoIcon fontSize="small"> </TodoIcon>
                <Typography> Todo {todos.length} </Typography>
            </div>
          {todos.map(note => (
            <div key={note.id} className={classes.b} >
              <TodoCard note={note} handleDeleteTodo={handleDeleteTodo} />
            </div>
          ))}
        </div>

        <div
          >
            <div className={classes.divv}>
                <InProgressIcon fontSize='small'> </InProgressIcon>
                <Typography> In Progress {inprogress.length} </Typography>
            </div>
           
          {inprogress.map(note => (
            <div key={note.id} className={classes.b} 
            >
              <InProgressCard note={note} handleDeleteInProgress={handleDeleteInProgress} />
            </div>
          ))}
        </div>

        <div
         >
            <div className={classes.divv}>
                <CompletedIcon fontSize="small"> </CompletedIcon>
                <Typography> Completed {completed.length} </Typography>
            </div>
          {completed.map(note => (
            <div key={note.id} className={classes.b} >
              <CompletedCard note={note} handleDeleteCompleted={handleDeleteCompleted} />
            </div>
          ))}
        </div>
      </div>

    </Container>
  )
}