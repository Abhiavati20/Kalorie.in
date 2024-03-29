import {
    SUBSCRIPTION_CREATE_FAIL,
    SUBSCRIPTION_CREATE_REQUEST,
    SUBSCRIPTION_CREATE_RESET,
    SUBSCRIPTION_CREATE_SUCCESS,
    SUBSCRIPTION_DETAILS_FAIL,
    SUBSCRIPTION_DETAILS_REQUEST,
    SUBSCRIPTION_DETAILS_SUCCESS,
    SUBSCRIPTION_LIST_FAIL,
    SUBSCRIPTION_LIST_MY_FAIL,
    SUBSCRIPTION_LIST_MY_REQUEST,
    SUBSCRIPTION_LIST_MY_RESET,
    SUBSCRIPTION_LIST_MY_SUCCESS,
    SUBSCRIPTION_LIST_REQUEST,
    SUBSCRIPTION_LIST_SUCCESS
} from '../constants/subscriptionConstants';

export const newSubscriptionReducer = (state={},action) =>{
    switch (action.type) {
        case SUBSCRIPTION_CREATE_REQUEST:
            return {
                loading: true,
            }
        case SUBSCRIPTION_CREATE_SUCCESS:
            return{
                loading : false,
                success : true,
                subscription : action.payload,
            }
        case SUBSCRIPTION_CREATE_FAIL:
            return {
                loading : false,
                error : action.payload,
            }
        case SUBSCRIPTION_CREATE_RESET:
            return {}
        default:
            return state;
    }
};

export const subscriptionDetailsReducer = (
    state = { loading : true, subscription : { shippingAddress : {} } },
    action
) => {
    switch (action.type) {
        case SUBSCRIPTION_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case SUBSCRIPTION_DETAILS_SUCCESS:
            return {
                loading:false,
                subscription:action.payload
            }
        case SUBSCRIPTION_DETAILS_FAIL:
            return {
                loading : false,
                error : action.payload,
            }
        default:
            return state;
    }
};

export const subscriptionListMyReducer = (state = {subscriptions : []}, action) =>{
    switch (action.type) {
        case SUBSCRIPTION_LIST_MY_REQUEST:
            return{
                loading:true,
            }
        
        case SUBSCRIPTION_LIST_MY_SUCCESS:
            return {
                loading : false,
                subscriptions : action.payload,
            }
        
        case SUBSCRIPTION_LIST_MY_FAIL:
            return {
                loading: false,
                error:action.payload,
            }

        case SUBSCRIPTION_LIST_MY_RESET:
            return { subscriptions:[]}
        
        default:
            return state;
    }
};

export const subscriptionListReducer = (state = { subscription:[]}, action) =>{
    switch (action.type) {
        case SUBSCRIPTION_LIST_REQUEST:
            return {
                loading : true,
            }
        
        case SUBSCRIPTION_LIST_SUCCESS:
            return {
                loading : false,
                subscriptions : action.payload,
            }
        case SUBSCRIPTION_LIST_FAIL:
            return { 
                loading:false,
                error:action.payload,
            }
        default:
            return state;
    }
}