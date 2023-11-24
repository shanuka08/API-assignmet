

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // to fix policy error
const app = express(); 
const PORT = 3000;

app.use(cors());

// middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data
let Data = [

  { id: 1, name: 'Kasun',reg:'ITT-1819-049' },
  
  


];

// Get all items
app.get('/items', (req, res) => {

  res.json(Data);

});

// Get an item by ID
app.get('/items/:id', (req, res) => {

  const itemId = parseInt(req.params.id);
  const item = Data.find(item => item.id === itemId);


  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);


});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Data.length + 1;
  Data.push(newItem);

  res.status(201).json(newItem);


});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  // Find the index of the item with the given ID
  const index = Data.findIndex(item => item.id === itemId);

  if (index !== -1) {
    // Update the item

    Data[index] = { ...Data[index], ...updatedItem };
    res.json(Data[index]);


  } else {
    res.status(404).json({ error: 'Item not found' });

  }


});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  Data = Data.filter(item => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });


});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
