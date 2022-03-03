import { CommentData, CommentDownvoteData, CommentUpvoteData, PostData, PostDownvotedData, PostUpvotedData, SubredditData, SubredditMemberData, UserData } from "./types";

export const users: UserData[] = [
    {
        user_name: 'Arita',
        email: 'arita@email.com',
        password: 'arita'
    },
    {
        user_name: 'Ed',
        email: 'ed@email.com',
        password: 'ed'
    },
    {
        user_name: 'Nicolas',
        email: 'nicolas@email.com',
        password: 'nicolas'
    },
    {
        user_name: 'Artiola',
        email: 'artiola@email.com',
        password: 'artiola'
    },
    {
        user_name: 'Desintila',
        email: 'desintila@email.com',
        password: 'desintila'
    }
]

export const subreddits: SubredditData[] = [
    {
        name: 'DataIsBeautiful',
        description: 'DataIsBeautiful is for visualizations that effectively convey information. Aesthetics are an important part of information visualization, but pretty pictures are not the sole aim of this subreddit.',
        background: 'https://styles.redditmedia.com/t5_2tk95/styles/bannerBackgroundImage_loa87i93mop01.png?width=4000&s=3e3a0f3e5687c3ecc34fd0632d8c78e38abcc737'
    },
    {
        name: 'History',
        description: 'History is a place for discussions about history. Feel free to submit interesting articles, tell us about this cool book you just read, or start a discussion about who everyone\'s favorite figure of minor French nobility is!',
        background: 'https://styles.redditmedia.com/t5_2qh53/styles/bannerBackgroundImage_mdjt5046x2101.png?width=4000&s=b7d2d364ae6e3a2c943a31231ae3035225d09d5e'
    },

    {
        name: 'whatisthisthing',
        description: 'If you have an object and you don\'t know what it is, this is the place for you to search for an answer. We may not know the "why" but we can help with the "what".',
        background: 'https://styles.redditmedia.com/t5_2tk95/styles/bannerBackgroundImage_loa87i93mop01.png?width=4000&s=3e3a0f3e5687c3ecc34fd0632d8c78e38abcc737'
    }

]

export const subredditMembers: SubredditMemberData[] = [
    {
        userId: 1,
        subredditId: 1,
        date: '01/01/2022'
    },
    {
        userId: 1,
        subredditId: 3,
        date: '10/01/2022'
    },
    {
        userId: 2,
        subredditId: 1,
        date: '10/02/2022'
    },
    {
        userId: 2,
        subredditId: 2,
        date: '05/02/2022'
    },
    {
        userId: 2,
        subredditId: 3,
        date: '06/02/2022'
    },
    {
        userId: 3,
        subredditId: 1,
        date: '12/02/2022'
    },
    {
        userId: 4,
        subredditId: 2,
        date: '12/02/2022'
    },
    {
        userId: 4,
        subredditId: 3,
        date: '15/01/2022'
    },
    {
        userId: 5,
        subredditId: 1,
        date: '29/01/2022'
    }
]

export const posts: PostData[] = [
    {
        userId: 2,
        subredditId: 2,
        title: 'Why Didn\'t The Allies Attack the USSR After WW2?',
        content: 'What was the sentiment towards the USSR at this point? I believe that at one point the Third Army and the USSR\'s troops got into a brief engagement and Patton / Churchill were overwhelmingly outspoken against them. Patton believing in the future that they will be our next enemy, which he was kinda on point with.',
        createdAt: '03/03/2022'
    },
    {
        userId: 4,
        subredditId: 2,
        title: '75 years ago, Hitler invaded Poland. Here\'s how it happened.',
        content: 'On September 1, 1939, the German army under Adolf Hitler launched an invasion of Poland that triggered the start of World War II (though by 1939 Japan and China were already at war). The battle for Poland only lasted about a month before a Nazi victory. ',
        createdAt: '27/02/2022'
    },
    {
        userId: 1,
        subredditId: 3,
        title: 'A cereal type bowl with what appears to be a roller in the middle. Google Lens was ineffective!',
        content: 'https://i.redd.it/07p1j1ney1l81.png',
        createdAt: '03/03/2022'
    },
    {
        userId: 2,
        subredditId: 3,
        title: 'Ceramic pair found among salt and pepper shakers',
        content: 'https://preview.redd.it/f2n4akfx02l81.jpg?width=4032&format=pjpg&auto=webp&s=244aa1729cea51a208778ecd0f592a450985bc0e',
        createdAt: '01/03/2022'
    },
    {
        userId: 5,
        subredditId: 1,
        title: 'Most spoken languages in the world [OC]',
        content: 'https://i.redd.it/m37wi5pda5l81.png',
        createdAt: '25/01/2022'
    },

]

export const comments: CommentData[] = [
    {
        userId: 3,
        postId: 1,
        content: 'Sure, the US was the only country with nukes for 4 years, but what do you do with nukes while the Red Army is chilling in Normandy'
    },
    {
        userId: 4,
        postId: 1,
        content: 'It was more profitable for the military industrial complex to wait for the USSR to have nukes and make money off of stock piling weapons and fighting proxy wars.'
    },
    {
        userId: 5,
        postId: 2,
        content: 'This is one of those things that was a real issue at the time, had a lot going on at the time, but because of later events it got completely forgotten about.'
    },
    {
        userId: 2,
        postId: 3,
        content: 'The bowl itself may have originally come with chopsticks that fit inside the holes'
    },
    {
        userId: 1,
        postId: 4,
        content: 'Candlesticks or incense holders maybe?'
    },
    {
        userId: 2,
        postId: 5,
        content: 'Is there a reason why Indian languages are so much more fractured than even Chinese languages?'
    },
    {
        userId: 3,
        postId: 5,
        content: 'Chinese language has many different variaties that are not listed in the chart. They are very different from each other that it\'s difficult to understand'
    },
    {
        userId: 1,
        postId: 5,
        content: 'Complex history, ancient cultures, lots of immigration over thousands of years, and the birth place of multiple civilizations.India and Mesopotamia are some of the most influential ancient civilizations.'
    }
]

export const commentUpvotes: CommentUpvoteData[] = [
    {
        userId: 3,
        commentId: 1
    },
    {
        userId: 5,
        commentId: 1
    },
    {
        userId: 4,
        commentId: 2
    }
]

export const commentDownvotes: CommentDownvoteData[] = [
    {
        userId: 1,
        commentId: 1
    },
    {
        userId: 5,
        commentId: 2
    }
]

export const postUpVotes: PostUpvotedData[] = [
    {
        userId: 3,
        postId: 1
    },
    {
        userId: 5,
        postId: 1
    },
    {
        userId: 1,
        postId: 2
    },
    {
        userId: 2,
        postId: 3
    }
]

export const postDownvotes: PostDownvotedData[] = [
    {
        userId: 2,
        postId: 1
    },
    {
        userId: 3,
        postId: 1
    },
    {
        userId: 5,
        postId: 2
    }
]