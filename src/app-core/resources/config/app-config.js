export default Object.freeze({
    //device platorm properties
    IS_MOBILE: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    IS_ANDROID: /android/i.test(navigator.userAgent),
    IS_IOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, //TODO
    IS_DESKTOP: (!this.IS_MOBILE || !this.IS_ANDROID || !this.IS_IOS),

    //browser session key properties
    SESSION_KEY_CLIENT: '',
    CSRF_KEY: '',

    //social media url properties
    FACEBOOK_URL: 'https://www.facebook.com/[TODO]',
    INSTAGRAM_URL: 'https://www.instagram.com/[TODO]',
    TWITTER_URL: 'https://www.twitter.com/[TODO]',
    YOUTUBE_URL: 'https://www.youtube.com/[TODO]',
    SNAPCHAT_URL: 'https://www.snapchat.com/add/[TODO]',
    PINTREST_URL: 'https://www.pintrest.com/[TODO]',
    LINKEDIN_URL: 'https://www.linkedin.com/[TODO]',

    //card transaction properties
    ALLOW_VISA: true,
    ALLOW_MASTERCARD: true,
    ALLOW_AMEX: true,
    ALLOW_DISCOVER: true,
});
