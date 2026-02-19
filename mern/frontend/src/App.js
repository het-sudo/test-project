import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {

  const [note, setnotes] = useState([])

  async function getallnotes() {
    try {
      const response = await axios.get('http://localhost:4000/getallnotes');
      console.log(response.data);
      setnotes(response.data.content); // FIXED
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  useEffect(() => {
    getallnotes();
  }, []); // FIXED

  return (
    <div>
      {
        note.map((n) => (
          <Card sx={{ maxWidth: 345,margin: 2 }} key={n._id}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {n.title}
              </Typography>
              <Typography variant="body2">
                {n.details}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  )
}

export default App
