import axios from 'axios';
import { backendUrl } from '../constants/urlConstant';
import {
    SUBSCRIPTION_CREATE_FAIL,
    SUBSCRIPTION_CREATE_REQUEST,
    SUBSCRIPTION_CREATE_SUCCESS,
    SUBSCRIPTION_DETAILS_FAIL,
    SUBSCRIPTION_DETAILS_REQUEST,
    SUBSCRIPTION_DETAILS_SUCCESS,
    SUBSCRIPTION_LIST_MY_FAIL,
    SUBSCRIPTION_LIST_MY_REQUEST,
    SUBSCRIPTION_LIST_MY_SUCCESS,
} from '../constants/subscriptionConstants'

export const newSubscription = (subscription) => async(dispatch,getState) =>{
    try{
        console.log(subscription);
        dispatch({
            type:SUBSCRIPTION_CREATE_REQUEST,
        })

        const {
            userLogin : { userInfo },
        } = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        
        const {data} = await axios.post(`${backendUrl}/api/subscription`,subscription,config);

        dispatch({
            type : SUBSCRIPTION_CREATE_SUCCESS,
            payload : data,
        })
    }
    catch(error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: SUBSCRIPTION_CREATE_FAIL,
            payload: message,
        })
    }
};

export const getSubscriptionDetails = (id) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:SUBSCRIPTION_DETAILS_REQUEST,
        })

        const {
            userLogin : { userInfo },
        } = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`${backendUrl}/api/subscription/${id}`, config)
        dispatch({
            type : SUBSCRIPTION_DETAILS_SUCCESS,
            payload:data,
        })
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: SUBSCRIPTION_DETAILS_FAIL,
            payload: message,
        });
    }
}

export const listMySubscription = () => async(dispatch,getState) => { 
    try {
        dispatch({
            type:SUBSCRIPTION_LIST_MY_REQUEST,
        });
        const {
            userLogin : { userInfo },
        } = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`${backendUrl}/api/subscription/mysubscription`, config);
        dispatch({
            type:SUBSCRIPTION_LIST_MY_SUCCESS,
            payload:data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: SUBSCRIPTION_LIST_MY_FAIL,
            payload: message,
        });
    }
}