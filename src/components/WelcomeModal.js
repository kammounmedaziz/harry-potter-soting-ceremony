import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Magical entrance animation
const magicalEntrance = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-180deg);
    filter: blur(10px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1) rotate(0deg);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px);
  }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const WelcomeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, 
    ${props => props.houseColors?.primary || '#1a1a2e'} 0%, 
    ${props => props.houseColors?.secondary || '#16213e'} 100%);
  border: 3px solid ${props => props.houseColors?.accent || '#d4af37'};
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  max-width: 450px;
  width: 85%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 
    0 0 30px rgba(212, 175, 55, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  animation: ${magicalEntrance} 1s ease-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 40%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 60%);
    animation: shimmer 3s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes shimmer {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
  }
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
    max-height: 90vh;
  }
`;

const HouseEmblem = styled.div`
  font-size: clamp(6rem, 12vw, 8rem);
  margin-bottom: 0.5rem;
  animation: ${floatAnimation} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.9);
  border-radius: 25px;
  padding: clamp(1rem, 2vw, 2rem);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: clamp(6rem, 12vw, 8rem);
    height: clamp(6rem, 12vw, 8rem);
    object-fit: contain;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
`;

// Helper component to render emblem as image or text
const WelcomeEmblemRenderer = ({ emblem, alt }) => {
  const isImagePath = emblem && (emblem.includes('/') || emblem.includes('.png') || emblem.includes('.jpg') || emblem.includes('.jpeg'));
  
  return (
    <HouseEmblem>
      {isImagePath ? (
        <img src={emblem} alt={alt || 'House emblem'} />
      ) : (
        emblem || '🎩'
      )}
    </HouseEmblem>
  );
};

const WelcomeTitle = styled.h1`
  font-family: 'MedievalSharp', cursive;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: ${props => props.houseColors?.accent || '#d4af37'};
  margin-bottom: 0.5rem;
  text-shadow: 
    0 0 15px rgba(212, 175, 55, 0.8),
    0 0 30px rgba(212, 175, 55, 0.4);
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const StudentName = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ffffff;
  margin-bottom: 0.3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const WelcomeMessage = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #e0e0e0;
  margin-bottom: 0.8rem;
  font-style: italic;
  line-height: 1.4;
`;

const HouseDetails = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.houseColors?.accent || '#d4af37'};
`;

const DetailItem = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  color: #d0d0d0;
  margin: 0.3rem 0;
  
  strong {
    color: ${props => props.houseColors?.accent || '#d4af37'};
  }
`;

const CloseButton = styled.button`
  background: linear-gradient(45deg, 
    ${props => props.houseColors?.accent || '#d4af37'}, 
    ${props => props.houseColors?.secondary || '#b8860b'});
  border: none;
  border-radius: 20px;
  padding: 10px 25px;
  font-family: 'Cinzel', serif;
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 600;
  color: #000;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
  }
  
  &:active {
    transform: translateY(0px);
  }
`;

const SparkleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .sparkle {
    position: absolute;
    font-size: 1.5rem;
    animation: ${sparkleAnimation} 2s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 20%;
      right: 15%;
      animation-delay: 0.5s;
    }
    
    &:nth-child(3) {
      bottom: 20%;
      left: 20%;
      animation-delay: 1s;
    }
    
    &:nth-child(4) {
      bottom: 10%;
      right: 10%;
      animation-delay: 1.5s;
    }
    
    &:nth-child(5) {
      top: 50%;
      left: 5%;
      animation-delay: 0.3s;
    }
    
    &:nth-child(6) {
      top: 60%;
      right: 5%;
      animation-delay: 0.8s;
    }
  }
`;

const WelcomeModal = ({ 
  isVisible, 
  studentName, 
  house, 
  onClose,
  autoCloseDelay = 5000 
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      
      // Auto close after delay
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, autoCloseDelay]);

  useEffect(() => {
    if (!isVisible && shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Wait for exit animation
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldRender]);

  if (!shouldRender) return null;

  const houseColors = {
    Gryffindor: { primary: '#740001', secondary: '#d3a625', accent: '#ffd700' },
    Hufflepuff: { primary: '#ffdb00', secondary: '#000000', accent: '#ffd700' },
    Ravenclaw: { primary: '#0e1a40', secondary: '#946b2d', accent: '#c0c0c0' },
    Slytherin: { primary: '#1a472a', secondary: '#aaaaaa', accent: '#c0c0c0' }
  };

  const currentHouseColors = houseColors[house?.name] || houseColors.Gryffindor;

  return (
    <WelcomeOverlay>
      <WelcomeCard houseColors={currentHouseColors}>
        <SparkleContainer>
          <div className="sparkle">✨</div>
          <div className="sparkle">⭐</div>
          <div className="sparkle">💫</div>
          <div className="sparkle">🌟</div>
          <div className="sparkle">✦</div>
          <div className="sparkle">✧</div>
        </SparkleContainer>
        
        <WelcomeEmblemRenderer emblem={house?.emblem} alt={`${house?.name} emblem`} />
        
        <WelcomeTitle houseColors={currentHouseColors}>
          Welcome to Hogwarts!
        </WelcomeTitle>
        
        <StudentName>{studentName}</StudentName>
        
        <WelcomeMessage>
          The Sorting Hat has spoken! You have been chosen for this house!
        </WelcomeMessage>
        
        <HouseDetails houseColors={currentHouseColors}>
          <DetailItem houseColors={currentHouseColors}>
            <strong>Founder:</strong> {house?.founder || 'Unknown'}
          </DetailItem>
          <DetailItem houseColors={currentHouseColors}>
            <strong>House Ghost:</strong> {house?.ghost || 'Unknown'}
          </DetailItem>
          <DetailItem houseColors={currentHouseColors}>
            <strong>Common Room:</strong> {house?.commonRoom || 'Unknown'}
          </DetailItem>
          <DetailItem houseColors={currentHouseColors}>
            <strong>House Traits:</strong> {house?.values?.join(', ') || 'Courage, Wisdom, Loyalty, Ambition'}
          </DetailItem>
        </HouseDetails>
        
        <WelcomeMessage>
          "Your journey at Hogwarts begins now. May you bring honor to your house!"
        </WelcomeMessage>
        
        <CloseButton 
          onClick={onClose}
          houseColors={currentHouseColors}
        >
          Continue to Great Hall
        </CloseButton>
      </WelcomeCard>
    </WelcomeOverlay>
  );
};

export default WelcomeModal;