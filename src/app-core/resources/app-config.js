const CONFIG = {
    //application properties
    REMEMBER_LOGIN: false,
    SESSION_TOKEN: '', //needs to be encrypted

    //session storage keys
    SESSION_KEY_TIMESTAMP1: '',
    SESSION_KEY_TIMESTAMP2: '',
    SESSION_KEY_DATA1: '',

    //social media URLs
    FACEBOOK_URL: 'https://www.facebook.com/',
    INSTAGRAM_URL: 'https://www.instagram.com/',
    TWITTER_URL: 'https://www.twitter.com/',
    YOUTUBE_URL: 'https://www.youtube.com/',
    PINTREST_URL: 'https://www.pintrest.com/',
    LINKEDIN_URL: 'https://www.linkedin.com/',

    //Time conversions (to milliseconds)
    MINUTE_IN_MS: 60000,
    HOUR_IN_MS: 3600000,
    WEEK_IN_MS: 604800000,
    MONTH_IN_MS: 2419200000,
};
Object.freeze(CONFIG)

export default CONFIG;