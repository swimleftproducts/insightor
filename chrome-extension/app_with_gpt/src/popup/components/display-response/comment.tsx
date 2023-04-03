import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';

interface CommentProps {
  content: string;
  isOdd: boolean;
}

const CommentContainer = styled.div`
  margin: 20px;
  margin-top: 10px;
  scroll-y: auto;
`;

const CommentText = styled.div`
  font-size: 14px;
  word-wrap: break-word;
`;

const Comment: React.FC<CommentProps> = ({ content, isOdd }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
    }
  };

  const handleMouseLeave = () => {
    if (commentRef.current) {
      commentRef.current.style.height = '70px'; // Or whatever initial height you want
    }
  };

  return (
    <CommentContainer>
      <CommentText
        ref={commentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '10px',
          backgroundColor: isOdd ? 'white' : 'lightgrey',
          height: '70px', // Or whatever initial height you want
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {content}
      </CommentText>
    </CommentContainer>
  );
};

export default Comment;
