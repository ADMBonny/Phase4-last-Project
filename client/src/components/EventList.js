import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data); // Assuming the API returns an array of events
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const getImageSrc = (event) => {
    const localImageMap = {
      "Research Paper Writing Workshop": "research-workshop.jpg",
      "Data Analysis Basics": "data-analysis.jpg",
      "Innovations in Environmental Science": "environmental-innovations.jpg",
      "AI in Academic Research": "ai-research.jpg",
    };

    if (localImageMap[event.name]) {
      return `${process.env.PUBLIC_URL}/images/${localImageMap[event.name]}`;
    }
    
    if (!event.imageUrl || event.imageUrl === 'undefined') {
      return '/path/to/default/image.jpg'; // Provide a path to your default image here
    }

    return `http://localhost:5000/uploads/${event.imageUrl}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Event List</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="border rounded-md p-4 flex flex-col items-center">
              <img src={getImageSrc(event)} alt={event.name} className="w-full h-64 object-cover rounded-md" />
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p className="text-gray-600">{event.date} - {event.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventList;
