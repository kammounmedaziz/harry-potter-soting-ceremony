import { SORTING_QUOTES, THINKING_MESSAGES } from '../constants/houses';

export const getRandomQuote = (houseName) => {
  const quotes = SORTING_QUOTES[houseName];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const selectRandomHouse = (availableHouses) => {
  return availableHouses[Math.floor(Math.random() * availableHouses.length)];
};

export const checkStudentExists = (houses, studentName) => {
  const allMembers = Object.values(houses).reduce((acc, house) => {
    return acc.concat(house.members);
  }, []);
  return allMembers.includes(studentName);
};

export const getAvailableHouses = (houses) => {
  return Object.values(houses).filter(house => house.capacity > 0);
};

export const updateHouseData = (houses, houseName, studentName) => {
  const updatedHouses = { ...houses };
  updatedHouses[houseName].members.push(studentName);
  updatedHouses[houseName].capacity -= 1;
  return updatedHouses;
};

export const isAllHousesFull = (houses) => {
  return Object.values(houses).every(house => house.capacity === 0);
};

export const getFinalStatistics = (houses) => {
  const stats = Object.values(houses).map(house => ({
    name: house.name,
    count: house.members.length,
    emblem: house.emblem
  }));
  
  const total = stats.reduce((sum, house) => sum + house.count, 0);
  
  return stats.map(house => ({
    ...house,
    percentage: total > 0 ? (house.count / total * 100).toFixed(1) : 0
  }));
};

export const getThinkingMessage = (index, studentName) => {
  const message = THINKING_MESSAGES[index];
  return message.replace('your', `${studentName}'s`);
};