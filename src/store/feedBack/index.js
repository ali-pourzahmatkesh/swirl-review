export const
    CALL_SEND_FEED_BACK = 'APP_CALL_SEND_FEED_BACK',
    SEND_FEED_BACK_SUCCESS = 'APP_SEND_FEED_BACK_SUCCESS',
    SEND_FEED_BACK_FAILED = 'APP_SEND_FEED_BACK_FAILED';
import {post} from '../appService';

export const callSendFeedBack = data => ({
    type: CALL_SEND_FEED_BACK,
    payload: data
});

export const fetchSendFeedBack = data => {
    return new Promise((resolve, reject) => {
        post('/api/v1/feedbacks', {message: data.message, memberOwner: data.memberOwner}).then(() => {
            resolve(data.navigation)
        }).catch(err => {
            reject(err);
        });
    });
};

export const fetchSendFeedBackSuccess = data => ({
    type: SEND_FEED_BACK_SUCCESS,
    payload: data
});

export const fetchSendFeedBackFailed = err => ({
    type: SEND_FEED_BACK_FAILED,
    payload: err
});