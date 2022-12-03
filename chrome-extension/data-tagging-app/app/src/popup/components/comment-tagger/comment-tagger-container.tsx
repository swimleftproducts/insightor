import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommentTagger from './comment-tagger'
import { getComments } from '../../services/getComments'

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
        label: 'General conv. positive',
        value: 'general_conversation_pos'
    },
    {
        label: 'General conv. neutral',
        value: 'general_conversation_neutral'
    },
    {
        label: 'General conv. negative',
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
    const [videoId, setVideoId] = useState< null | string>(null)
    const [commentList, setCommentList] = useState<any[] | null>([])
    const [nextPageToken, setNextPageToken] = useState<string | null | undefined>(null)

    const onTagClick = () => {
        // sent labeled data to be stored in s3
    }

    // code getting video comments
    const uploadAndSaveComments = async () => {
        try {
            const {items, nextPageToken:newNextPageToken} = await getComments(nextPageToken, videoId)
            // save comment list
            setCommentList(items)
            // save nextPageToken if present
            setNextPageToken(newNextPageToken)
            console.log(newNextPageToken)
        } catch(err){
            console.log(err)
        } 
    }
/* item: {
    item1: {
        item2
    }
}

var 1 = map
var 2 = var1.map
*/
    useEffect(()=>{
        if( videoId ){
            uploadAndSaveComments()  
        }
    },[videoId])

    useEffect(()=>{
        const getURL = async () => {
            let videoId
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const url = new URL(tabs[0].url);
                const params = new URLSearchParams(url.search)
                videoId = params.get('v')
                if (videoId) {
                    setVideoId(videoId)
                }
            });
        }
        getURL()
    },[])

    useEffect(()=>{
        if(!commentList){
            //get more comments
        }
    },[commentList])

    return (
        <div>
            <CommentTagger comment={commentList.pop()} categories={TAG_LIST} onTagClick={onTagClick}/>
        </div>
    )
}

export default CommentTaggerContainer