import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommentTagger from './comment-tagger'
import { getComments } from '../../services/getComments'
import { getVideoDetail } from '../../services/getVideoMetaData'
import {uploadTaggedComment} from '../../services/uploadTaggedComment'
import {TAG_LIST, NON_VARIABLE_TAG_LIST} from '../../utils/tag-list'

interface CommentTaggerContainerProps {
    name: string
}
interface s3UploadInterface {
    "video_id":string,
    "video_title":string,
    "comment_id":string,
    "like_count": number,
    "total_reply_count":number,
    "comment":string,
    "label_primary": string,
    "label_secondary": string,
    "tagger":string
}

const CommentTaggerContainer = ({name}: CommentTaggerContainerProps) => {
    const [videoId, setVideoId] = useState< null | string>(null)
    const [videoMetaData, setVideoMetaData] = useState<any|null>(null)
    const [commentList, setCommentList] = useState<any[] | null>([])
    const [nextPageToken, setNextPageToken] = useState<string | null | undefined>(null)


    // {video_title, comment_id, like_count, total_reply_count, comment, label_primary, label_secondary}
    const onTagClick = async ( taggedCommentData) => {
        // handle skip click and also when there is no comment 
        if(taggedCommentData.label_primary==='skip' || taggedCommentData.label_secondary==='skip' || !taggedCommentData.comment){
            const [,...newCommentList] = commentList
            //remove first element from comment list
            setCommentList(newCommentList)
            //update cache
            localStorage.setItem('tagging_comment_list', JSON.stringify(newCommentList))
            return
        }

        // sent labeled data to be stored in s3
        const s3UploadData = {
        "video_id": videoId,
        "video_title": videoMetaData.items[0].snippet.title,
        "video_category": videoMetaData.items[0].snippet.categoryId,
        "video_description": videoMetaData.items[0].snippet.description,
        "tagger":name,
        ...taggedCommentData
        }
        try{
            await uploadTaggedComment(s3UploadData)
        } catch (err){
            console.log('upload failed')
            return
        }
        const [,...newCommentList] = commentList
        //remove first element from comment list
        setCommentList(newCommentList)
        //update cache
        localStorage.setItem('tagging_comment_list', JSON.stringify(newCommentList))
    }

    const uploadAndSaveComments = async () => {
        try {
            if(localStorage.getItem('endOfComments')) return
            const {items, nextPageToken:newNextPageToken} = await getComments(nextPageToken, videoId)
            console.log(items)
            setCommentList(items)
            setNextPageToken(newNextPageToken)
            localStorage.setItem('tagging_videoId',videoId)
            localStorage.setItem('tagging_comment_list', JSON.stringify(items))
            if(newNextPageToken){
                localStorage.setItem('tagging_nextPageToken', newNextPageToken)
            }else {
                localStorage.setItem('endOfComments', 'true')
            }
            

        } catch(err){
            console.log(err)
        } 
    }
    const getVideoMetaData = async () => {
        try {
            const data = await getVideoDetail(videoId)
            setVideoMetaData(data)
        } catch(err){
            console.log(err)
        } 
    }

    const checkAndUseCache = () => {
        const cacheVideoId = localStorage.getItem('tagging_videoId')
        if  (cacheVideoId === videoId){
            setCommentList(JSON.parse(localStorage.getItem('tagging_comment_list')))
            setNextPageToken(localStorage.getItem('tagging_nextPageToken'))
            return true
        } else{
            localStorage.removeItem('endOfComments')
        }
        return false
    }

    useEffect(()=>{
        if(!videoId) return
        getVideoMetaData()
        if(checkAndUseCache()) return
        uploadAndSaveComments()  
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
        if(!commentList.length && videoId){
            //get more comments
            uploadAndSaveComments()
        }
    },[commentList])

    return (
        <div>
            <CommentTagger 
                comment={(commentList.length ? commentList[0]: null)} 
                categories={TAG_LIST} 
                categoriesNonVariable={NON_VARIABLE_TAG_LIST}
                onTagClick={onTagClick}/>
        </div>
    )
}

export default CommentTaggerContainer