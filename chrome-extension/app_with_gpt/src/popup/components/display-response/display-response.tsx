// DisplayResponse.tsx
import React from 'react';
import styled from 'styled-components';
import Comment from './comment';

interface DisplayResponseProps {
  gptResponse: ResponseData,
  onBack: () => void,
}

interface ResponseData {
  statusCode: number,
  is_new_video: boolean,
  response_type: string,
  response: string | string[],
}

const CommentContainer = styled.div`
  margin: 20px;
  margin-top: 0px;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  font-weight: 800;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
`
const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`

const DisplayResponse: React.FC<DisplayResponseProps> = ({ gptResponse, onBack }) => {
  const { response_type, response, is_new_video } = gptResponse

  const renderContent = () => {
    if (response_type === 'summary') {
      return <Summary content={response as string} />;
    } else if (response_type === 'comment list') {
      return <CommentList comments={response as string[]} />;
    } else {
      return <p>Sorry, GPT got confused.</p>;
    }
  };
  return (
    <CommentContainer>
      <Tools>
        <BackButton onClick={onBack}>&larr;</BackButton>
        {is_new_video && <p>Thanks for the wait, this is a new video I had to watch</p>}
      </Tools>
      {renderContent()}
    </CommentContainer>
  );
};

export default DisplayResponse;


const StyledHeader = styled.h3`
  font-size: 24px;
`
const StyledSummary = styled.p`
  font-size: 18px;
`
const StyledComment = styled.li`
  margin: 20px;
  font-size: 16px;
`
interface CommentListProps {
  comments: string[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <StyledHeader>Comments</StyledHeader>
      <ul>
        {comments.map((comment, index) => (
          <StyledComment key={index}>{comment}</StyledComment>
        ))}
      </ul>
    </div>
  );
};

interface SummaryProps {
  content: string;
}

const Summary: React.FC<SummaryProps> = ({ content }) => {
  return (
    <div>
      <StyledHeader>Summary</StyledHeader>
      <StyledSummary>{content}</StyledSummary>
    </div>
  );
};