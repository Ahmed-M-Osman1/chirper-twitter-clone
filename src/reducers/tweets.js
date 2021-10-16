import { RECEIVE_TWEETS,TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
      case TOGGLE_TWEET:
        return {
          ... state,
          [action.id] : {
            ...state[action.id],
            likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid)=>uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
          }
        }
      case ADD_TWEET :
        const { tweet } = action
        let replayingTo = {}
        if(tweet.replayingTo !== null){
          replayingTo = {
            [tweet.replayingTo]: {
              ...state[tweet.replayingTo],
              replies: state[tweet.replayingTo].replies.concat([tweet.id])
            }
          }
        }
        return {
          ... state,
          [action.tweet.id]: action.tweet,
          ...replayingTo
        } 
    default :
      return state
  }
}