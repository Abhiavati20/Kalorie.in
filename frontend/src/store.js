import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers';

import { userLoginReducer, userRegisterReducer, userDetailsReducer ,userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';

import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListReducer,orderDeliverReducer,orderPayReducer } from './reducers/orderReducers';
import { 
    newSubscriptionReducer, 
    subscriptionDetailsReducer,
    subscriptionListMyReducer,
    subscriptionListReducer,
} from './reducers/subscriptionReducers'

const reducer = combineReducers(
    {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete : productDeleteReducer,
        productCreate : productCreateReducer,
        productUpdate : productUpdateReducer,
        productReviewCreate : productReviewCreateReducer,
        productTopRated : productTopRatedReducer,

        userLogin         : userLoginReducer,
        userRegister      : userRegisterReducer,
        userDetails       : userDetailsReducer,
        userUpdateProfile : userUpdateProfileReducer,
        userList          : userListReducer,
        userDelete        : userDeleteReducer,
        userUpdate        : userUpdateReducer,

        cart : cartReducer,

        orderCreate  : orderCreateReducer,
        orderDetails : orderDetailsReducer,
        orderListMy  : orderListMyReducer,
        orderList    : orderListReducer,
        orderPay     : orderPayReducer,
        orderDeliver : orderDeliverReducer,

        newSubscription     : newSubscriptionReducer,
        subscriptionDetails : subscriptionDetailsReducer,
        subscriptionListMy  : subscriptionListMyReducer,
        subscriptionList    : subscriptionListReducer,
    }
);

const userInfoFromStorage = localStorage.getItem('userInfo')
                            ? JSON.parse(localStorage.getItem('userInfo'))
                            : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
                            ? JSON.parse(localStorage.getItem('cartItems'))
                            : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
                            ? JSON.parse(localStorage.getItem('shippingAddress'))
                            : {}
                          

const initialState = {
    userLogin:{userInfo : userInfoFromStorage},
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
}
  
const middleware = [thunk];
  
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
  
export default store;

// @media screen and (min-width: 320px) and (max-width: 767px) {
   
// }