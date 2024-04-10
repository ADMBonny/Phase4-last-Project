import axios from 'axios';

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`http://localhost:5000/events/${eventId}`);
    alert('Event deleted successfully');
    // Trigger a state update or refresh to reflect the deletion
  } catch (error) {
    console.error('Failed to delete event', error);
    alert('Failed to delete event');
  }
};
