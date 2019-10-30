const CONFIG_STATIC = {
    //application properties
    IS_DESKTOP: false,
    IS_MOBILE: false,
    IS_ANDROID: false,
    IS_IOS: false,

    ALLOWED_HTTP_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],

    //session storage keys
    SESSION_KEY_TIMESTAMP1: '',
    SESSION_KEY_TIMESTAMP2: '',
    SESSION_KEY_DATA1: '',

    //social media URLs
    FACEBOOK_URL: 'https://www.facebook.com/[TODO]',
    INSTAGRAM_URL: 'https://www.instagram.com/[TODO]',
    TWITTER_URL: 'https://www.twitter.com/[TODO]',
    YOUTUBE_URL: 'https://www.youtube.com/[TODO]',
    SNAPCHAT_URL: 'https://www.snapchat.com/add/[TODO]',
    PINTREST_URL: 'https://www.pintrest.com/[TODO]',
    LINKEDIN_URL: 'https://www.linkedin.com/[TODO]',

    //Time conversions (to milliseconds)
    MINUTE_IN_MS: 60000,
    HOUR_IN_MS: 3600000,
    WEEK_IN_MS: 604800000,
    MONTH_IN_MS: 2419200000
};
Object.freeze(CONFIG_STATIC);
export default CONFIG_STATIC;