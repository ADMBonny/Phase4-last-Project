import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import EditEventForm from './components/EditEventForm';
import EventManagement from './components/EventManagement';
import { Container } from 'react-bootstrap'; 

function App() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white p-6 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <nav>
              <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
            </nav>
            <div className="flex space-x-4">
              <Link to="/" className="text-lg font-semibold text-indigo-600 py-2 px-4 rounded hover:bg-indigo-100 transition duration-300 ease-in-out">Home</Link>
              <Link to="/add-event" className="text-lg font-semibold text-blue-600 py-2 px-4 rounded hover:bg-blue-100 transition duration-300 ease-in-out">Add Event</Link>
              <Link to="/manage-events" className="text-lg font-semibold text-green-600 py-2 px-4 rounded hover:bg-green-100 transition duration-300 ease-in-out">List Events</Link>
            </div>
          </div>
        </div>
        <h1 className="text-gray-800 text-3xl font-bold mx-auto px-4 py-8">Event Management System</h1>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<EventList events={events} />} />
            <Route path="/manage-events" element={<EventManagement events={events} />} />
            <Route path="/add-event" element={<AddEventForm onEventAdded={fetchEvents} />} />
            <Route path="/edit-event/:eventId" element={<EditEventForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;




