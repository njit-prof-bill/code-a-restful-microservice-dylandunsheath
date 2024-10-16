const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// Users Array (holds information)
let users = [];

app.get('/', (req, res) => {
    res.send('Hello! Welcome to the REST API Microservice by Dylan Dunsheath');
});

// Post 
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    /* Create user with the following attributes:
    * id (which is incremented by 1)
    * Name
    * Email
    */
    const newUser = { id: users.length + 1, name, email };

    // Save the new user
    users.push(newUser);

    // Respond with 201 status 
    res.status(201).json(newUser);
});

// Get 
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));

    // User doesn't exist
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});



// Put
app.put('/users/:id', (req, res) => {
    const { id } = req.params;   // Extract user ID from the URL
    const { name, email } = req.body;  // Extract user data from the request body


    // Find the user by ID
    const user = users.find(u => u.id === parseInt(id));

    // If user not found, return 404 error
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Validate that at least one field (name or email) is provided for update
    if (!name && !email) {
        return res.status(400).json({ error: 'Please provide name or email to update' });
    }

    // Update user information (both ifs)
    if (name) { 
        user.name = name;
    }
    if (email) {
        user.email = email;
    }

    // Respond with the updated user information
    res.json(user);  
});


// Delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;  // Extract the user ID from the URL

    // Find the index of the user to be deleted
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    // If user not found, return 404 error
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    res.status(204).send();  
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing