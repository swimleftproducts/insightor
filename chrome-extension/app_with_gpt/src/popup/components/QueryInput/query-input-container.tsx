// QueryInputContainer.tsx
import React, { useState } from 'react';
import queryGPT from '../../services/queryGPT';
import styled from 'styled-components';

interface QueryInputContainerProps {
  videoId: string;
  setShowSentimentComments: (show: boolean) => void;
  setHideSentimentAnalysis: (hide: boolean) => void;
  setGPTResponse: (any) => void,
  setShowSpinner: any
}

const Container = styled.div`
  margin: 20px;
`;

const QueryInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
`;

const QueryInputContainer: React.FC<QueryInputContainerProps> = ({
  videoId,
  setShowSentimentComments,
  setHideSentimentAnalysis,
  setGPTResponse,
  setShowSpinner
}) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        setShowSentimentComments(true)
        setHideSentimentAnalysis(true)
        setShowSpinner(true)
        const response = await queryGPT.makeQuery(videoId, query)
        setGPTResponse(response)
        setShowSpinner(false)
        
      } catch (error) {
        console.error(error);
        setShowSentimentComments(false)
        setHideSentimentAnalysis(false)
        setShowSpinner(false)
      }
    }
  };

  return (
    <Container>
      <QueryInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your query and press Enter"
      />
    </Container>
  );
};

export default QueryInputContainer;
