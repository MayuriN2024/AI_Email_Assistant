import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import './App.css'

function App() {

  const [email, setEmail] = useState("")
  const [tone, setTone] = useState("")

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Paste original email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Tone (optional)</InputLabel>

            <Select
              value={tone}
              label="Tone (optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
          >
            Generate Reply
          </Button>
        </Box>

      </Box>

    </Container>
  )
}

export default App
