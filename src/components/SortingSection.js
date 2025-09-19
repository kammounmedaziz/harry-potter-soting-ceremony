import React, { useState } from 'react';
import styled from 'styled-components';

const SortingContainer = styled.div`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
  border-radius: 20px;
  padding: 2.5rem;
  margin: 2rem 0;
  border: 2px solid rgba(211, 166, 37, 0.3);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

const SortingTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #D3A625;
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  text-shadow: 0 2px 10px rgba(211, 166, 37, 0.3);
`;

const SortingInputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  color: #C0C0C0;
  font-family: 'Cinzel', serif;
  font-weight: 500;
  font-size: 1.1rem;
`;

const StudentInput = styled.input`
  padding: 1rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  font-family: 'Cinzel', serif;
  min-width: 250px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: #D3A625;
    box-shadow: 
      0 0 15px rgba(211, 166, 37, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SortButton = styled.button`
  background: linear-gradient(135deg, #4B0082, #6A0B96);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  min-width: 200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5A0A9A, #7B0CAD);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(75, 0, 130, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #333, #444);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BatchSortingSection = styled.div`
  margin-top: 2rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BatchButton = styled.button`
  background: linear-gradient(135deg, #2F4F4F, #4682B4);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, #4682B4, #5F9EA0);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(47, 79, 79, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SortingStatus = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(75, 0, 130, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(75, 0, 130, 0.3);
  color: #E6E6FA;
  font-family: 'Crimson Text', serif;
  font-size: 1.1rem;
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

const AvailableHouses = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const AvailableHousesTitle = styled.p`
  color: #C0C0C0;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const HousesList = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HouseChip = styled.span`
  background: linear-gradient(135deg, ${props => props.color}40, ${props => props.color}60);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${props => props.color}80;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.available ? 1 : 0.3};
  transition: all 0.3s ease;
`;

const SortingSection = ({ onSortStudent, isSorting, houses }) => {
  const [studentName, setStudentName] = useState('');

  const handleSort = () => {
    if (studentName.trim() && !isSorting) {
      onSortStudent(studentName.trim());
      setStudentName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSort();
    }
  };

  const handleBatchSort = () => {
    const names = prompt(
      'Enter student names separated by commas:\n(e.g., Harry Potter, Hermione Granger, Ron Weasley)'
    );
    
    if (names) {
      const nameList = names.split(',').map(name => name.trim()).filter(name => name);
      if (nameList.length > 0) {
        // Sort each name with a delay
        nameList.forEach((name, index) => {
          setTimeout(() => {
            onSortStudent(name);
          }, index * 3000); // 3 second delay between each sorting
        });
      }
    }
  };

  return (
    <SortingContainer>
      <SortingTitle>⚡ Student Sorting Chamber</SortingTitle>
      
      <SortingInputSection>
        <InputGroup>
          <InputLabel>🧙‍♂️ Student Name:</InputLabel>
          <StudentInput
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter student's full name..."
            disabled={isSorting}
            maxLength={50}
          />
        </InputGroup>
        
        <SortButton 
          onClick={handleSort}
          disabled={!studentName.trim() || isSorting}
        >
          {isSorting ? '🔮 Sorting...' : '🔮 Begin Sorting Ritual'}
        </SortButton>
      </SortingInputSection>

      {isSorting && (
        <SortingStatus>
          The Sorting Hat is contemplating your destiny...
        </SortingStatus>
      )}

      <AvailableHouses>
        <AvailableHousesTitle>Available Houses:</AvailableHousesTitle>
        <HousesList>
          {Object.values(houses).map(house => (
            <HouseChip 
              key={house.name}
              color={house.color}
              available={house.capacity > 0}
            >
              <span>{house.emblem}</span>
              <span>{house.name}</span>
              <span>({house.capacity})</span>
            </HouseChip>
          ))}
        </HousesList>
      </AvailableHouses>

      <BatchSortingSection>
        <BatchButton onClick={handleBatchSort} disabled={isSorting}>
          👥 Sort Multiple Students
        </BatchButton>
      </BatchSortingSection>
    </SortingContainer>
  );
};

export default SortingSection;