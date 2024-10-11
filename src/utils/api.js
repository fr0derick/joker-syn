import config from '../config';

// Fetch all jokers from the backend
export const fetchAllJokers = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/get_all_jokers`);
    if (!response.ok) throw new Error('Failed to fetch jokers');
    const data = await response.json();
    return data.map((joker) => ({ name: joker, id: `joker-${joker}` }));
  } catch (error) {
    console.error('Error fetching jokers:', error);
    throw error;
  }
};

// Fetch synergies for owned jokers
export const fetchSynergies = async (ownedJokers) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/find_synergies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jokers: ownedJokers.map((joker) => joker.name) }),
    });
    if (!response.ok) throw new Error('Failed to fetch synergies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching synergies:', error);
    throw error;
  }
};
