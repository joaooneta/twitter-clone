import { TWEETS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const tweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => ({
        url: TWEETS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    createTweet: builder.mutation({
      query: (data) => ({
        url: TWEETS_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tweet"],
    }),

    likeTweet: builder.mutation({
      query: (tweetId) => ({
        url: `${TWEETS_URL}/${tweetId}/like`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Tweet"],
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useCreateTweetMutation,
  useLikeTweetMutation,
} = tweetsApiSlice;
