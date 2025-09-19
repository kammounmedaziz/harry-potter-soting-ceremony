import React from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  margin: 2rem 0;
`;

const DisplayTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #D3A625;
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  text-shadow: 0 2px 10px rgba(211, 166, 37, 0.3);
`;

const HousesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HouseCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color}15, ${props => props.color}25);
  border: 2px solid ${props => props.color}60;
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 15px 35px ${props => props.color}30,
      0 0 20px ${props => props.color}20;
    border-color: ${props => props.color}80;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.secondary || props.color});
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: radial-gradient(circle, ${props => props.color}40, transparent);
    border-radius: 50%;
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const HouseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const HouseEmblem = styled.span`
  font-size: 3rem;
  margin-right: 1rem;
  animation: float 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-3px) rotate(1deg); }
    50% { transform: translateY(-6px) rotate(0deg); }
    75% { transform: translateY(-3px) rotate(-1deg); }
  }
`;

const HouseInfo = styled.div`
  flex: 1;
`;

const HouseName = styled.h3`
  color: ${props => props.color};
  font-family: 'Cinzel', serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px ${props => props.color}40;
`;

const HouseTraits = styled.p`
  color: #C0C0C0;
  font-size: 0.95rem;
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const HouseElement = styled.p`
  color: ${props => props.color};
  font-size: 0.9rem;
  font-weight: 500;
`;

const CapacitySection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CapacityBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 8px;
  margin: 0.5rem 0;
  overflow: hidden;
  position: relative;
`;

const CapacityFill = styled.div`
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.secondary || props.color});
  height: 100%;
  width: ${props => props.percentage}%;
  border-radius: 10px;
  transition: width 0.5s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const CapacityText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CapacityNumbers = styled.span`
  color: ${props => props.color};
  font-weight: 600;
`;

const CapacityStatus = styled.span`
  color: ${props => {
    if (props.percentage >= 100) return '#FF4444';
    if (props.percentage >= 75) return '#FFA500';
    return '#00FF00';
  }};
  font-weight: 600;
  font-size: 0.8rem;
`;

const MembersSection = styled.div`
  margin-top: 1.5rem;
`;

const MembersTitle = styled.h4`
  color: #C0C0C0;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  font-family: 'Cinzel', serif;
`;

const MembersList = styled.div`
  max-height: 120px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.color}60 transparent;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.color}60;
    border-radius: 2px;
  }
`;

const MemberItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid ${props => props.color};
  padding: 0.5rem 0.8rem;
  margin-bottom: 0.5rem;
  border-radius: 0 8px 8px 0;
  font-size: 0.9rem;
  color: #E0E0E0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const EmptyMembers = styled.div`
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
`;

const HouseDisplay = ({ houses }) => {
  const getCapacityStatus = (used, total) => {
    const percentage = total > 0 ? (used / total) * 100 : 0;
    if (percentage >= 100) return 'FULL';
    if (percentage >= 75) return 'Nearly Full';
    if (percentage >= 50) return 'Half Full';
    if (percentage > 0) return 'Available';
    return 'Empty';
  };

  return (
    <DisplayContainer>
      <DisplayTitle>🏰 House Status & Information</DisplayTitle>
      
      <HousesGrid>
        {Object.values(houses).map((house, index) => {
          const used = house.originalCapacity - house.capacity;
          const total = house.originalCapacity;
          const percentage = total > 0 ? (used / total) * 100 : 0;
          
          return (
            <HouseCard 
              key={house.name} 
              color={house.color}
              secondary={house.secondary}
            >
              <HouseHeader>
                <HouseEmblem delay={index * 0.5}>
                  {house.emblem}
                </HouseEmblem>
                <HouseInfo>
                  <HouseName color={house.color}>
                    {house.name.toUpperCase()}
                  </HouseName>
                  <HouseTraits>{house.traits}</HouseTraits>
                  <HouseElement color={house.color}>
                    Element: {house.element}
                  </HouseElement>
                </HouseInfo>
              </HouseHeader>

              <CapacitySection>
                <CapacityText>
                  <span>Capacity:</span>
                  <CapacityNumbers color={house.color}>
                    {used}/{total}
                  </CapacityNumbers>
                </CapacityText>
                
                <CapacityBar>
                  <CapacityFill 
                    color={house.color}
                    secondary={house.secondary}
                    percentage={percentage}
                  />
                </CapacityBar>
                
                <CapacityText>
                  <span>Remaining: {house.capacity}</span>
                  <CapacityStatus percentage={percentage}>
                    {getCapacityStatus(used, total)}
                  </CapacityStatus>
                </CapacityText>
              </CapacitySection>

              <MembersSection>
                <MembersTitle>
                  Current Members ({house.members.length})
                </MembersTitle>
                
                <MembersList color={house.color}>
                  {house.members.length > 0 ? (
                    house.members.map((member, memberIndex) => (
                      <MemberItem key={memberIndex} color={house.color}>
                        {member}
                      </MemberItem>
                    ))
                  ) : (
                    <EmptyMembers>
                      No members yet - awaiting new students!
                    </EmptyMembers>
                  )}
                </MembersList>
              </MembersSection>
            </HouseCard>
          );
        })}
      </HousesGrid>
    </DisplayContainer>
  );
};

export default HouseDisplay;