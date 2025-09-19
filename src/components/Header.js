import React from 'react';
import styled from 'styled-components';
import SortingHat3D from './3D/SortingHat3D';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 2rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--gryffindor-secondary), 
      var(--hufflepuff-primary),
      var(--ravenclaw-secondary),
      var(--slytherin-secondary),
      transparent
    );
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(212,175,55,0.4);
  }
`;

const MainTitle = styled.h1`
  font-family: 'MedievalSharp', cursive;
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin-bottom: 1rem;
  background: linear-gradient(
    45deg,
    var(--gryffindor-secondary),
    var(--hufflepuff-primary),
    var(--ravenclaw-secondary),
    var(--slytherin-secondary),
    var(--gryffindor-tertiary)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmerText 4s ease-in-out infinite;
  text-shadow: 
    0 0 30px rgba(212,175,55,0.4),
    0 0 60px rgba(212,175,55,0.2);
  position: relative;
  z-index: 3;
  
  &::before {
    content: '✨';
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: gentleFloat 4s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  
  &::after {
    content: '✨';
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: gentleFloat 4s ease-in-out infinite;
    animation-delay: 1.5s;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--text-silver);
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0.9;
`;

const Quote = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--text-muted);
  font-style: italic;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    left: -20px;
    top: -10px;
    font-size: 3rem;
    color: var(--gryffindor-secondary);
    opacity: 0.6;
  }
  
  &::after {
    content: '"';
    position: absolute;
    right: -20px;
    bottom: -20px;
    font-size: 3rem;
    color: var(--gryffindor-secondary);
    opacity: 0.6;
  }
`;

const MagicalElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  .star {
    position: absolute;
    color: var(--text-gold);
    animation: magicalPulse 3s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 30%;
      right: 15%;
      animation-delay: 1s;
    }
    
    &:nth-child(3) {
      bottom: 20%;
      left: 20%;
      animation-delay: 2s;
    }
    
    &:nth-child(4) {
      bottom: 30%;
      right: 10%;
      animation-delay: 0.5s;
    }
  }
`;

const Header = ({ isHatActive, isSorting, currentStudent }) => {
  return (
    <HeaderContainer>
      <MagicalElements>
        <div className="star">⭐</div>
        <div className="star">🌟</div>
        <div className="star">✨</div>
        <div className="star">💫</div>
      </MagicalElements>
      
      <MainTitle className="magical-text">
        Hogwarts Sorting Ceremony
      </MainTitle>
      
      <div style={{ margin: '2rem 0', height: '300px' }}>
        <SortingHat3D 
          isSorting={isSorting} 
          onHatClick={() => console.log('Hat clicked!')}
          modelPath="/models/hat.fbx"
        />
      </div>
      
      <Subtitle>
        School of Witchcraft and Wizardry
      </Subtitle>
      
      <Quote>
        Oh, you may not think I'm pretty, but don't judge on what you see,
        I'll eat myself if you can find a smarter hat than me.
      </Quote>
    </HeaderContainer>
  );
};

export default Header;