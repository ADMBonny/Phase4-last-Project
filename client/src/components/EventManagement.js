import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Function to determine the correct image source path
  const getImageSrc = (event) => {
    const localImageMap = {
      "Research Paper Writing Workshop": "research-workshop.jpg",
      "Data Analysis Basics": "data-analysis.jpg",
      "Innovations in Environmental Science": "environmental-innovations.jpg",
      "AI in Academic Research": "ai-research.jpg",
    };
  
    // Check for a local image match first
    if (localImageMap[event.name]) {
      return `${process.env.PUBLIC_URL}/images/${localImageMap[event.name]}`;
    }
    
    // Handle undefined imageUrl or set a default image
    if (!event.imageUrl || event.imageUrl === 'undefined') {
      return '/path/to/default/image.jpg'; // Adjust path to your default image
    }
  
    // For other cases, construct the server image path
    return `http://localhost:5000/uploads/${event.imageUrl}`;
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Manage Events</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="border rounded-md p-4 flex flex-col items-center">
              <img src={getImageSrc(event)} alt={event.name} className="w-full h-64 object-cover rounded-md" />
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p className="text-gray-600">{event.date} - {event.description}</p>
              </div>
              <div className="flex w-full justify-around pb-4">
                <button onClick={() => handleEdit(event.id)} className="bg-blue-500 text-white py-2 px-4 rounded-md w-24 mr-2">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white py-2 px-4 rounded-md w-24">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventManagement;
