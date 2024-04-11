import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

function EditEventForm() {
  const { eventId } = useParams(); // Get the eventId from the URL
  const navigate = useNavigate(); // For redirecting after the edit
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '', // Assuming the date is in 'YYYY-MM-DD' format for the input[type="date"]
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        const { name, description, date } = response.data;
        setEventData({ name, description, date: date.slice(0, 10) }); // Trim time from ISO string if necessary
      } catch (error) {
        console.error('Failed to fetch event details', error);
        alert('Failed to fetch event details');
      }
    };
    fetchEventDetails();
  }, [eventId]); // Re-run effect if eventId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/events/${eventId}`, eventData);
      alert('Event updated successfully!');
      navigate('/'); // Redirect to the event list after successful update
    } catch (error) {
      console.error('Failed to update event', error);
      alert('Failed to update event');
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600">Update Event</button>
      </form>
    </div>
  );
}

export default EditEventForm;
