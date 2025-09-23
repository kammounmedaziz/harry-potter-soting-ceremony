import { useState } from 'react';
import { INITIAL_HOUSES } from '../constants/houses';
import {
  getRandomQuote,
  selectRandomHouse,
  checkStudentExists,
  getAvailableHouses,
  updateHouseData,
  isAllHousesFull,
  getFinalStatistics,
  getThinkingMessage
} from '../utils/sortingUtils';

export const useSortingCeremony = () => {
  const [houses, setHouses] = useState(INITIAL_HOUSES);
  const [sortingResults, setSortingResults] = useState([]);
  const [isHatActive, setIsHatActive] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState({
    isVisible: false,
    studentName: '',
    house: null
  });

  const addResult = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const resultEntry = {
      id: Date.now() + Math.random(),
      timestamp,
      message
    };
    
    setSortingResults(prev => [...prev, resultEntry]);
  };

  const setupCapacities = (capacities) => {
    const updatedHouses = { ...houses };
    Object.keys(capacities).forEach(houseName => {
      if (updatedHouses[houseName]) {
        updatedHouses[houseName].capacity = capacities[houseName];
        updatedHouses[houseName].originalCapacity = capacities[houseName];
        updatedHouses[houseName].members = [];
      }
    });
    
    setHouses(updatedHouses);
    setIsHatActive(true);
    setSortingResults([]);
    
    const totalCapacity = Object.values(capacities).reduce((sum, cap) => sum + cap, 0);
    addResult(`🎩 The Sorting Hat awakens with ancient magic...`);
    addResult(`✨ Ceremony initialized! Total capacity: ${totalCapacity} students`);
    addResult(`🔮 Speak a name, and let the sorting begin!`);
  };

  const animateSorting = (studentName, availableHouses) => {
    return new Promise((resolve) => {
      let messageIndex = 0;
      
      const showNextMessage = () => {
        if (messageIndex < 7) { // Number of thinking messages
          addResult(getThinkingMessage(messageIndex, studentName));
          messageIndex++;
          setTimeout(showNextMessage, 800);
        } else {
          completeSorting(studentName, availableHouses);
          resolve();
        }
      };

      showNextMessage();
    });
  };

  const completeSorting = (studentName, availableHouses) => {
    const selectedHouse = selectRandomHouse(availableHouses);
    const quote = getRandomQuote(selectedHouse.name);
    
    const updatedHouses = updateHouseData(houses, selectedHouse.name, studentName);
    setHouses(updatedHouses);
    
    setTimeout(() => {
      addResult(`🔥 The Hat opens its brim and declares...`);
      
      setTimeout(() => {
        addResult(`\n🌟 ${selectedHouse.emblem} ${studentName.toUpperCase()} → ${selectedHouse.name.toUpperCase()}! ${selectedHouse.emblem} 🌟`);
        addResult(`🎩 "${quote}"`);
        
        // Show welcome modal
        setWelcomeModal({
          isVisible: true,
          studentName: studentName,
          house: selectedHouse
        });
        
        addResult(`🏰 Welcome to ${selectedHouse.name} House!`);
        addResult(`👤 Founder: ${selectedHouse.founder}`);
        addResult(`👻 House Ghost: ${selectedHouse.ghost}`);
        addResult(`🏠 Common Room: ${selectedHouse.commonRoom}`);
        
        const remaining = updatedHouses[selectedHouse.name].capacity;
        const totalMembers = updatedHouses[selectedHouse.name].members.length;
        addResult(`📊 ${selectedHouse.name} Status: ${totalMembers} member(s), ${remaining} space(s) remaining`);
        
        if (remaining === 0) {
          addResult(`🔒 ${selectedHouse.name} House is now at full capacity!`);
        }
        
        addResult(`${'='.repeat(70)}`);
        
        if (isAllHousesFull(updatedHouses)) {
          addResult(`\n🎊 THE SORTING CEREMONY IS COMPLETE! 🎊`);
          addResult(`🏰 All houses have reached their capacity.`);
          showFinalStatistics(updatedHouses);
        }
        
        setIsSorting(false);
      }, 1000);
    }, 500);
  };

  const showFinalStatistics = (finalHouses) => {
    const stats = getFinalStatistics(finalHouses);
    const total = stats.reduce((sum, house) => sum + house.count, 0);
    
    addResult(`\n🎊 FINAL SORTING STATISTICS 🎊`);
    stats.forEach(house => {
      addResult(`${house.emblem} ${house.name}: ${house.count} students (${house.percentage}%)`);
    });
    addResult(`\n📊 Total Students Sorted: ${total}`);
  };

  const sortStudent = async (studentName) => {
    if (!studentName.trim()) return;
    
    if (checkStudentExists(houses, studentName)) {
      addResult(`⚠️ ${studentName} has already been sorted!`);
      return;
    }

    const availableHouses = getAvailableHouses(houses);
    
    if (availableHouses.length === 0) {
      addResult(`🏰 All houses are full! Sorting ceremony complete.`);
      return;
    }

    setIsSorting(true);
    await animateSorting(studentName, availableHouses);
  };

  const clearResults = () => {
    setSortingResults([]);
    addResult(`🧹 The chronicle has been cleared by ancient magic.`);
  };

  const closeWelcomeModal = () => {
    setWelcomeModal({
      isVisible: false,
      studentName: '',
      house: null
    });
  };

  return {
    houses,
    sortingResults,
    isHatActive,
    isSorting,
    welcomeModal,
    setupCapacities,
    sortStudent,
    clearResults,
    closeWelcomeModal
  };
};