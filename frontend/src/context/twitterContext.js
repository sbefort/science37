import React, { useReducer, createContext } from 'react';

export const TwitterContext = createContext();

export const ACTIONS = {
  SET_IS_LOADING: 'setIsLoading',
  SET_TWEETS: 'setTweets',
  SET_NEXT_RESULTS: 'setNextResults',
  SET_UNIQUE_HASHTAGS: 'setUniqueHashtags',
  SET_SELECTED_HASHTAGS: 'setSelectedHashtags',
  FILTER_TWEETS: 'filterTweets',
  RESET_STATE: 'resetState',
};

const initialState = {
  isLoading: false,
  tweets: undefined,
  filteredTweets: undefined,
  uniqueHashtags: [],
  selectedHashtags: [],
  nextResults: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case ACTIONS.SET_TWEETS: {
      const tweets = Array.isArray(state.tweets) ? [...state.tweets, ...action.payload] : action.payload;
      return {
        ...state,
        tweets,
        filteredTweets: tweets,
      };
    }
    case ACTIONS.SET_NEXT_RESULTS: {
      return {
        ...state,
        nextResults: action.payload,
      };
    }
    case ACTIONS.SET_UNIQUE_HASHTAGS: {
      if (!state.tweets) return state;

      const uniqueHashtags = [...new Set(state.tweets.map((tweet) => tweet.hashtags).flat())];

      return {
        ...state,
        uniqueHashtags,
      };
    }
    case ACTIONS.SET_SELECTED_HASHTAGS: {
      // If the hashtag already exists in the array, remove it (toggle off)
      if (state.selectedHashtags.includes(action.payload)) {
        return {
          ...state,
          selectedHashtags: state.selectedHashtags.filter((hashtag) => hashtag !== action.payload),
        };
      }

      // Otherwise add the hashtag to the array
      return {
        ...state,
        selectedHashtags: [...state.selectedHashtags, action.payload],
      };
    }
    case ACTIONS.FILTER_TWEETS: {
      // If no tweets have been returned by the API or all hashtags have been toggled off, reset the filter.
      if (!state.tweets || state.selectedHashtags.length === 0) {
        return {
          ...state,
          filteredTweets: state.tweets,
        };
      }

      const filteredTweets = state.tweets.filter((tweet) => tweet.hashtags.some((hashtag) => state.selectedHashtags.includes(hashtag)));
      return {
        ...state,
        filteredTweets,
      };
    }
    case ACTIONS.RESET_STATE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export const TwitterProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  // Potential performance optimization that seems to have no effect at this time.
  // const value = useMemo(() => ([state, dispatch]), [state, dispatch]);

  return (
    <TwitterContext.Provider value={value}>
      {children}
    </TwitterContext.Provider>
  );
};
