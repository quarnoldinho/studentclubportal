import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const MEMBERS_FILE = path.join(__dirname, 'members.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read members from file
function getMembers() {
  try {
    if (fs.existsSync(MEMBERS_FILE)) {
      const data = fs.readFileSync(MEMBERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading members file:', error);
  }
  return [];
}

// Helper function to save members to file
function saveMembers(members) {
  try {
    fs.writeFileSync(MEMBERS_FILE, JSON.stringify(members, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving members file:', error);
  }
}

// GET /api/members - Retrieve all members
app.get('/api/members', (req, res) => {
  const members = getMembers();
  res.json(members);
});

// POST /api/members - Add a new member
app.post('/api/members', (req, res) => {
  try {
    const newMember = req.body;
    
    // Validate required fields
    if (!newMember.memberName || !newMember.email || !newMember.yearLevel || !newMember.organization) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const members = getMembers();
    members.push(newMember);
    saveMembers(members);

    res.status(201).json({ 
      success: true, 
      message: 'Member saved successfully', 
      data: newMember 
    });
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ error: 'Failed to save member' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'PSU E-Sports Club Backend API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`POST to http://localhost:${PORT}/api/members to add members`);
  console.log(`GET http://localhost:${PORT}/api/members to retrieve all members`);
});
