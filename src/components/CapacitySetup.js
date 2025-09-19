import React, { useState } from 'react';
import styled from 'styled-components';

const SetupContainer = styled.div`
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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      #D3A625 50%, 
      transparent 100%);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

const SetupTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #D3A625;
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  text-shadow: 0 2px 10px rgba(211, 166, 37, 0.3);
`;

const QuickSetupSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const QuickSetupLabel = styled.p`
  color: #C0C0C0;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const QuickSetupButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const QuickButton = styled.button`
  background: linear-gradient(135deg, #4B0082, #6A0B96);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-family: 'Cinzel', serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, #5A0A9A, #7B0CAD);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(75, 0, 130, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const HousesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const HouseInputCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color}15, ${props => props.color}25);
  border: 2px solid ${props => props.color}40;
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${props => props.color}30;
    border-color: ${props => props.color}60;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.color};
  }
`;

const HouseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const HouseEmblem = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
  animation: float 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
`;

const HouseName = styled.h3`
  color: ${props => props.color};
  font-family: 'Cinzel', serif;
  font-size: 1.3rem;
  font-weight: 600;
  text-shadow: 0 1px 5px ${props => props.color}50;
`;

const HouseTraits = styled.p`
  color: #C0C0C0;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const CapacityInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.houseColor};
    box-shadow: 0 0 10px ${props => props.houseColor}50;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SetupButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(211, 166, 37, 0.3);
  position: relative;
  overflow: hidden;
  
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
  
  &:hover {
    background: linear-gradient(135deg, #A0522D, #CD853F);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CapacitySetup = ({ onSetupComplete }) => {
  const [capacities, setCapacities] = useState({
    Gryffindor: 10,
    Hufflepuff: 10,
    Ravenclaw: 10,
    Slytherin: 10
  });

  const houses = [
    { 
      name: 'Gryffindor', 
      emblem: '🦁', 
      color: '#740001', 
      traits: 'Brave, Daring, Chivalrous',
      delay: 0
    },
    { 
      name: 'Hufflepuff', 
      emblem: '🦡', 
      color: '#FFD800', 
      traits: 'Loyal, Patient, Fair',
      delay: 0.5
    },
    { 
      name: 'Ravenclaw', 
      emblem: '🦅', 
      color: '#0E1A40', 
      traits: 'Intelligent, Wise, Creative',
      delay: 1
    },
    { 
      name: 'Slytherin', 
      emblem: '🐍', 
      color: '#1A472A', 
      traits: 'Ambitious, Cunning, Resourceful',
      delay: 1.5
    }
  ];

  const quickSetup = (value) => {
    const newCapacities = {};
    houses.forEach(house => {
      newCapacities[house.name] = value;
    });
    setCapacities(newCapacities);
  };

  const randomSetup = () => {
    const newCapacities = {};
    houses.forEach(house => {
      newCapacities[house.name] = Math.floor(Math.random() * 11) + 5; // 5-15
    });
    setCapacities(newCapacities);
  };

  const handleCapacityChange = (houseName, value) => {
    const numValue = parseInt(value) || 0;
    setCapacities(prev => ({
      ...prev,
      [houseName]: numValue
    }));
  };

  const handleSetup = () => {
    const totalCapacity = Object.values(capacities).reduce((sum, cap) => sum + cap, 0);
    
    if (totalCapacity === 0) {
      alert('At least one house must have a capacity greater than 0!');
      return;
    }
    
    onSetupComplete(capacities);
  };

  return (
    <SetupContainer>
      <SetupTitle>🎩 House Capacity Configuration</SetupTitle>
      
      <QuickSetupSection>
        <QuickSetupLabel>Quick Setup Options:</QuickSetupLabel>
        <QuickSetupButtons>
          <QuickButton onClick={() => quickSetup(5)}>
            Small Class (5 each)
          </QuickButton>
          <QuickButton onClick={() => quickSetup(10)}>
            Medium Class (10 each)
          </QuickButton>
          <QuickButton onClick={() => quickSetup(20)}>
            Large Class (20 each)
          </QuickButton>
          <QuickButton onClick={randomSetup}>
            Random (5-15 each)
          </QuickButton>
        </QuickSetupButtons>
      </QuickSetupSection>

      <HousesGrid>
        {houses.map(house => (
          <HouseInputCard key={house.name} color={house.color}>
            <HouseHeader>
              <HouseEmblem delay={house.delay}>{house.emblem}</HouseEmblem>
              <HouseName color={house.color}>{house.name}</HouseName>
            </HouseHeader>
            <HouseTraits>{house.traits}</HouseTraits>
            <CapacityInput
              type="number"
              min="0"
              max="50"
              value={capacities[house.name]}
              onChange={(e) => handleCapacityChange(house.name, e.target.value)}
              placeholder="Enter capacity"
              houseColor={house.color}
            />
          </HouseInputCard>
        ))}
      </HousesGrid>

      <SetupButton onClick={handleSetup}>
        🎩 Awaken the Sorting Hat
      </SetupButton>
    </SetupContainer>
  );
};

export default CapacitySetup;