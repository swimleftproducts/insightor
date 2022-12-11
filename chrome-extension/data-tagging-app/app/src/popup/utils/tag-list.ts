const POS_COLOR = ' linear-gradient(180deg, #4BD980 0%, #3CB067 100%);'
const NEUTRAL_COLOR = 'linear-gradient(180deg, #F2C287 0%, #D8AB73 100%);'
const NEG_COLOR = 'linear-gradient(180deg, #F36161 0%, #CC4E4E 100%);'

const NON_VARIABLE_TAG_LIST = [
    {
        label: 'Information',
        value: 'information',
        color: 'linear-gradient(180deg, #AAAAAA 0%, #8B8B8B 100%);'
    },
    {
        label: 'Advice give or ask',
        value: 'advice',
        color: 'linear-gradient(180deg, #469EAE 0%, #468894 100%);'
    },
    {
        label: 'Video content description',
        value: 'video_content_description',
        color: 'linear-gradient(180deg, #FD6BB4 0%, #DB5C9B 100%);'
    },
    {
        label: 'Spam',
        value: 'spam',
        color: 'linear-gradient(180deg, #FFED47 0%, #DBCB39 100%);'
    },
    {
        label: 'Skip',
        value: 'skip',
        color: 'white'
    }
]

const TAG_LIST =[
    {
        label: 'Impression',
        value: 'impression_pos',
        color: POS_COLOR
        
    },
    {
        label: 'Impression',
        value: 'impression_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Impression',
        value: 'impression_neg',
        color: NEG_COLOR
    },
    {
        label: 'General Conv. ',
        value: 'general_conversation_pos',
        color: POS_COLOR
    },
    {
        label: 'General Conv.',
        value: 'general_conversation_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'General Conv.',
        value: 'general_conversation_neg',
        color: NEG_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_pos',
        color: POS_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Opinion',
        value: 'opinion_neg',
        color: NEG_COLOR
    },
    {
        label: 'Personal Feels',
        value: 'personal_feelings_pos',
        color: POS_COLOR
    },
    {
        label: 'Personal Feels ',
        value: 'personal_feelings_neutral',
        color: NEUTRAL_COLOR
    },
    {
        label: 'Personal Feels',
        value: 'personal_feelings_neg',
        color: NEG_COLOR
    },
]

export {
    NON_VARIABLE_TAG_LIST,
    TAG_LIST
}