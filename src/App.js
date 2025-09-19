import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import CapacitySetup from './components/CapacitySetup';
import SortingSection from './components/SortingSection';
import HouseDisplay from './components/HouseDisplay';
import ResultsPanel from './components/ResultsPanel';
import Statistics from './components/Statistics';
import LoadingScreen from './components/LoadingScreen';
import { GlobalStyles } from './styles/GlobalStyles';
import { useSortingCeremony } from './hooks/useSortingCeremony';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  background-attachment: fixed;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.1), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.05), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.08), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.03), transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    pointer-events: none;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MagicalBorder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    #740001 0%, #D3A625 25%, 
    #0E1A40 50%, #946B2D 75%, 
    #1A472A 100%);
  z-index: 10;
  animation: shimmer 3s ease-in-out infinite;
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const {
    houses,
    sortingResults,
    isHatActive,
    isSorting,
    setupCapacities,
    sortStudent,
    clearResults
  } = useSortingCeremony();

  const handleLoadingComplete = () => {
    setIsAppLoading(false);
  };

  // Show loading screen first
  if (isAppLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <MagicalBorder />
        <ContentWrapper>
          <Header 
            isHatActive={isHatActive}
            isSorting={isSorting}
            currentStudent=""
          />
          
          {!isHatActive && (
            <CapacitySetup onSetupComplete={setupCapacities} />
          )}
          
          {isHatActive && (
            <>
              <SortingSection 
                onSortStudent={sortStudent}
                isSorting={isSorting}
                houses={houses}
              />
              
              <HouseDisplay houses={houses} />
              
              <Statistics houses={houses} />
              
              <ResultsPanel 
                results={sortingResults}
                onClearResults={clearResults}
              />
            </>
          )}
        </ContentWrapper>
      </AppContainer>
    </>
  );
}

export default App;