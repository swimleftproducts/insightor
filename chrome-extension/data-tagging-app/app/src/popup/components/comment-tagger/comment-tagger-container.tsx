import React from 'react'
import styled from 'styled-components'
import CommentTagger from './comment-tagger'

const TAG_LIST =[
    {
        label: 'Information',
        value: 'information'
    },
    {
        label: 'Advice give or ask',
        value: 'advice'
    },
    {
        label: 'Video content description',
        value: 'video_content_description'
    },
    {
        label: 'Impression positive',
        value: 'impression_pos'
    },
    {
        label: 'Impression neutral',
        value: 'impression_neutral'
    },
    {
        label: 'Impression negative',
        value: 'impression_neg'
    },
    {
        label: 'General conversation positive',
        value: 'general_conversation_pos'
    },
    {
        label: 'General conversation neutral',
        value: 'general_conversation_neutral'
    },
    {
        label: 'General conversation negative',
        value: 'general_conversation_neg'
    },
    {
        label: 'Opinion positive',
        value: 'opinion_pos'
    },
    {
        label: 'Opinion neutral',
        value: 'opinion_neutral'
    },
    {
        label: 'Opinion negative',
        value: 'opinion_neg'
    },
    {
        label: 'Personal feelings positive',
        value: 'personal_feelings_pos'
    },
    {
        label: 'Personal feelings neutral',
        value: 'personal_feelings_neutral'
    },
    {
        label: 'Personal feelings negative',
        value: 'personal_feelings_neg'
    },
     {
        label: 'Spam',
        value: 'spam'
    }
    
]


interface CommentTaggerContainerProps {
    name: string
}
const CommentTaggerContainer = ({name}: CommentTaggerContainerProps) => {

    const onTagClick = () => {

    }
    return (
        <div>
            <CommentTagger categories={TAG_LIST} onTagClick={onTagClick}/>
        </div>
    )
}

export default CommentTaggerContainer