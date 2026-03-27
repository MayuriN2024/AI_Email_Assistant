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
  const [tone, setTone] = useState("professional")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!email) {
      alert("Please paste the email content first.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tone })
      })

      const data = await response.json()
      if (data.reply) {
        setReply(data.reply)
      } else {
        alert("Reply generation failed: " + (data.error || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Could not connect to the backend (http://localhost:5000). Is it running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Email Reply Assistant
      </Typography>

      <Box sx={{ mx: 3 }}>
        
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Paste original email content"
          placeholder="I received an email from... It said..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel>Tone</InputLabel>

            <Select
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="concise">Concise / Brief</MenuItem>
              <MenuItem value="empathetic">Empathetic / Supportive</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading}
            sx={{ height: '56px', width: '200px' }}
          >
            {loading ? "Thinking..." : "Generate AI Reply"}
          </Button>
        </Box>

        {reply && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Suggested Reply:</Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              variant="filled"
              value={reply}
              readOnly
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
            <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => navigator.clipboard.writeText(reply)}
            >
                Copy to Clipboard
            </Button>
          </Box>
        )}
      </Box>

    </Container>
  )

}

export default App
