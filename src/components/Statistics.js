import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid rgba(211, 166, 37, 0.3);
  backdrop-filter: blur(10px);
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #D3A625;
  font-family: 'Cinzel', serif;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #C0C0C0;
  font-weight: 500;
`;

const DistributionChart = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const DistributionTitle = styled.h3`
  color: #D3A625;
  font-family: 'Cinzel', serif;
  margin-bottom: 1rem;
  text-align: center;
`;

const DistributionBars = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const DistributionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HouseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  font-weight: 500;
`;

const HouseEmblem = styled.span`
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.9);
  border-radius: 12px;
  padding: 0.8rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
  }
`;

// Helper component to render emblem as image or text
const StatisticsEmblemRenderer = ({ emblem, alt }) => {
  console.log('Statistics - House:', alt, 'Emblem:', emblem);
  
  // Force PNG image rendering for all houses
  const houseName = alt?.split(' ')[0]; // Extract house name
  const imagePath = emblem.includes('/media/') ? emblem : `/media/${houseName}.png?v=3`;
  
  return (
    <HouseEmblem>
      <img 
        src={imagePath} 
        alt={alt || 'House emblem'} 
        onError={(e) => {
          console.error('Statistics - Image failed to load:', imagePath);
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'inline';
        }}
      />
      <span style={{display: 'none', fontSize: '4rem'}}>{emblem}</span>
    </HouseEmblem>
  );
};

const DistributionBar = styled.div`
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const DistributionFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.secondary || props.color});
  border-radius: 10px;
  transition: width 1s ease;
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

const DistributionValue = styled.div`
  min-width: 80px;
  text-align: right;
  font-weight: 600;
  color: ${props => props.color};
`;

const Statistics = ({ houses }) => {
  const totalSorted = Object.values(houses).reduce((sum, house) => 
    sum + house.members.length, 0
  );
  
  const totalCapacity = Object.values(houses).reduce((sum, house) => 
    sum + house.originalCapacity, 0
  );
  
  const availableHouses = Object.values(houses).filter(house => 
    house.capacity > 0
  ).length;
  


  const completionPercentage = totalCapacity > 0 ? 
    ((totalSorted / totalCapacity) * 100).toFixed(1) : 0;

  return (
    <StatsContainer>
      <StatsGrid>
        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatValue>{totalSorted}</StatValue>
          <StatLabel>Students Sorted</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>🎓</StatIcon>
          <StatValue>{totalCapacity}</StatValue>
          <StatLabel>Total Capacity</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>🏠</StatIcon>
          <StatValue>{availableHouses}/4</StatValue>
          <StatLabel>Available Houses</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>✨</StatIcon>
          <StatValue>{completionPercentage}%</StatValue>
          <StatLabel>Completion Rate</StatLabel>
        </StatCard>
      </StatsGrid>

      {totalSorted > 0 && (
        <DistributionChart>
          <DistributionTitle>📈 House Distribution</DistributionTitle>
          <DistributionBars>
            {Object.values(houses).map(house => {
              const count = house.members.length;
              const percentage = totalSorted > 0 ? 
                (count / totalSorted) * 100 : 0;
              
              return (
                <DistributionItem key={house.name}>
                  <HouseLabel>
                    <StatisticsEmblemRenderer emblem={house.emblem} alt={`${house.name} emblem`} />
                  </HouseLabel>
                  
                  <DistributionBar>
                    <DistributionFill 
                      color={house.color}
                      secondary={house.secondary}
                      percentage={percentage}
                    />
                  </DistributionBar>
                  
                  <DistributionValue color={house.color}>
                    {count} ({percentage.toFixed(1)}%)
                  </DistributionValue>
                </DistributionItem>
              );
            })}
          </DistributionBars>
        </DistributionChart>
      )}
    </StatsContainer>
  );
};

export default Statistics;