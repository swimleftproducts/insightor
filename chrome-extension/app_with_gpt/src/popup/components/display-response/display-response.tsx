// DisplayResponse.tsx
import React from 'react';
import styled from 'styled-components';
import Comment from './comment';

interface DisplayResponseProps {
  gptResponse: string[];
  onBack: () => void;
}

const CommentContainer = styled.div`
  margin: 20px;
  margin-top: -10px;
  height: 500px;
`;

const BackButton = styled.button`
  font-weight: 800;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
`;

const DisplayResponse: React.FC<DisplayResponseProps> = ({ gptResponse, onBack }) => {
  return (
    <CommentContainer>
      <BackButton onClick={onBack}>&larr;</BackButton>
      {gptResponse.map((content, index) => (
        content !== "" && (
          <Comment key={index} isOdd={index % 2 === 0} content={content}/>
        )
      ))}
    </CommentContainer>
  );
};

export default DisplayResponse;
