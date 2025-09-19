import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border: 2px solid rgba(211, 166, 37, 0.3);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const ResultsTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #D3A625;
  font-family: 'Cinzel', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  text-shadow: 0 2px 10px rgba(211, 166, 37, 0.3);
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.div`
  color: #C0C0C0;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ResultsControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'clear' && `
    background: linear-gradient(135deg, #8B0000, #A52A2A);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #A52A2A, #CD5C5C);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 0, 0, 0.4);
    }
  `}
  
  ${props => props.variant === 'save' && `
    background: linear-gradient(135deg, #006400, #228B22);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #228B22, #32CD32);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 100, 0, 0.4);
    }
  `}
  
  ${props => props.variant === 'copy' && `
    background: linear-gradient(135deg, #4682B4, #5F9EA0);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #5F9EA0, #87CEEB);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(70, 130, 180, 0.4);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

const ResultsDisplay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #D3A625 rgba(0, 0, 0, 0.3);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #D3A625, #946B2D);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #E6B73A, #A67C42);
  }
`;

const ResultEntry = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${props => props.isHighlight && `
    background: rgba(211, 166, 37, 0.1);
    border-left: 3px solid #D3A625;
    padding-left: 1rem;
    animation: highlightPulse 2s ease-in-out;
    
    @keyframes highlightPulse {
      0%, 100% { background: rgba(211, 166, 37, 0.1); }
      50% { background: rgba(211, 166, 37, 0.2); }
    }
  `}
`;

const Timestamp = styled.span`
  color: #666;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const ResultMessage = styled.span`
  color: #00FF41;
  
  ${props => props.isSpecial && `
    color: #FFD700;
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(255, 215, 0, 0.3);
  `}
  
  ${props => props.isError && `
    color: #FF6B6B;
  `}
  
  ${props => props.isInfo && `
    color: #87CEEB;
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const ResultsPanel = ({ results, onClearResults }) => {
  const displayRef = useRef(null);

  // Auto-scroll to bottom when new results are added
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }, [results]);

  const handleSaveResults = () => {
    const resultsText = results.map(result => 
      `[${result.timestamp}] ${result.message}`
    ).join('\n');
    
    const blob = new Blob([
      'HOGWARTS SORTING CEREMONY RESULTS\n',
      '=' + '='.repeat(49) + '\n\n',
      resultsText
    ], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorting_results_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyResults = async () => {
    const resultsText = results.map(result => 
      `[${result.timestamp}] ${result.message}`
    ).join('\n');
    
    try {
      await navigator.clipboard.writeText(resultsText);
      alert('Results copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy results:', err);
      alert('Failed to copy results to clipboard.');
    }
  };

  const getMessageType = (message) => {
    if (message.includes('→') && message.includes('🌟')) return 'special';
    if (message.includes('⚠️') || message.includes('❌')) return 'error';
    if (message.includes('🎩') || message.includes('✨') || message.includes('🔮')) return 'info';
    return 'normal';
  };

  const isHighlightMessage = (message) => {
    return message.includes('→') && message.includes('🌟');
  };

  return (
    <ResultsContainer>
      <ResultsTitle>📜 Sorting Chronicle</ResultsTitle>
      
      <ResultsHeader>
        <ResultsCount>
          {results.length} entries recorded
        </ResultsCount>
        
        <ResultsControls>
          <ControlButton 
            variant="copy" 
            onClick={handleCopyResults}
            disabled={results.length === 0}
          >
            📋 Copy
          </ControlButton>
          <ControlButton 
            variant="save" 
            onClick={handleSaveResults}
            disabled={results.length === 0}
          >
            💾 Save
          </ControlButton>
          <ControlButton 
            variant="clear" 
            onClick={onClearResults}
            disabled={results.length === 0}
          >
            🧹 Clear
          </ControlButton>
        </ResultsControls>
      </ResultsHeader>

      <ResultsDisplay ref={displayRef}>
        {results.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📜</EmptyIcon>
            <div>The chronicle awaits the first sorting...</div>
          </EmptyState>
        ) : (
          results.map((result) => {
            const messageType = getMessageType(result.message);
            const isHighlight = isHighlightMessage(result.message);
            
            return (
              <ResultEntry 
                key={result.id} 
                isHighlight={isHighlight}
              >
                <Timestamp>[{result.timestamp}]</Timestamp>
                <ResultMessage 
                  isSpecial={messageType === 'special'}
                  isError={messageType === 'error'}
                  isInfo={messageType === 'info'}
                >
                  {result.message}
                </ResultMessage>
              </ResultEntry>
            );
          })
        )}
      </ResultsDisplay>
    </ResultsContainer>
  );
};

export default ResultsPanel;