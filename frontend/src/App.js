import React                                     from 'react';                                         // importing react module
import { 
    BrowserRouter as Router, 
    Route,
    Routes,
    // useParams
} from 'react-router-dom';



import Navbar                                    from './components/Navbar/Navbar';                    // importing navbar component
import MainScreen                                from './screens/MainScreen/MainScreen';
import ProductDetailScreen                       from './screens/MainScreen/ProductDetailScreen';
import LoginScreen                               from './screens/Login/LoginScreen';
import SendEmailScreen                               from './screens/Login/SendEmailScreen';
import RegisterScreen                            from './screens/Register/RegisterScreen';
import ProfileScreen                             from './screens/Profile/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrder/PlaceOrderScreen';
import ShippingScreen from './screens/Shipping/ShippingScreen';
import OrderScreen from './screens/Order/OrderScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import CartScreen from './screens/CartScreen/CartScreen'
// import ProductSlider from './components/ProductSlider/ProductSlider'
// import SubscriptionOrderScreen from './screens/Subscription/SubscriptionOrderScreen'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Subscription from './screens/Subscription/Subscription';
import MyOrderScreen from './screens/myOrders/MyOrderScreen';
import MyPendingOrderScreen from './screens/myOrders/MyPendingOrderScreen';
import ResetPassword from './screens/Login/ResetPassword';
import Subscription from './screens/Subscription/Subscription';
import AboutUsScreen from './screens/About/AboutUsScreen';
import TermScreen from './screens/TermsAndCondition/PrivacyPolicy';
import DeliveryPolicyScreen from './screens/TermsAndCondition/DeliveryPolicy';
import ContactUs from './screens/ContactUs/ContactUs';
import TermsAndCondition from './screens/TermsAndCondition/TermsAndCondition';

toast.configure()


const App = () => {
  // const params = useParams();
  // const {keyword} = params
  return (
    <Router >
      {/* Navbar */}
      <Navbar />
      {/* {!keyword && <ProductSlider />} */}
      
      <main className= ''>
          <Routes>
            <Route exact path='/' element={<MainScreen  />} />
            <Route exact path='/about' element={<AboutUsScreen/>} />
            <Route exact  path='/contact' element={<ContactUs/>} />
            <Route exact path='/privacyPolicy' element={<TermScreen/>} />
            <Route exact path='/termsAndCondition' element={<TermsAndCondition/>} />
            <Route exact path='/deliveryPolicy' element={<DeliveryPolicyScreen/>} />
            <Route exact path='/cart' element={<CartScreen  />} />
            <Route exact path='/product/:id' element={<ProductDetailScreen />} />
            <Route exact path ='/subscription' element={<Subscription/>} />
            
            <Route exact path='/login' element={<LoginScreen />} />
            <Route exact path='/sendEmail' element={<SendEmailScreen />} />
            <Route exact path='/resetPassword' element={<ResetPassword />} />
            <Route exact path='/register' element={<RegisterScreen />} />
            <Route exact path='/profile' element={<ProfileScreen />} />
            <Route exact path='/orders' element={<MyOrderScreen />} />
            <Route exact path='/pendingOrders' element={<MyPendingOrderScreen />} />

            <Route exact path='/shipping' element={<ShippingScreen />} />
            {/* <Route path='/payment' element={<PaymentScreen />} /> */}
            <Route exact path='/placeorder' element={<PlaceOrderScreen />} />
            
            <Route exact path='/order/:id' element={<OrderScreen />} /> 
            {/* <Route path='/subscription/:id' element={<SubscriptionOrderScreen />} />  */}

            <Route exact path='/admin/productlist' element={<ProductListScreen />} />
            <Route exact path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
            <Route exact path='/admin/product/:id/edit' element={<ProductEditScreen/>}  />
            <Route exact path='/admin/userlist' element={<UserListScreen/>} />
            <Route exact path='/admin/user/:id/edit' element={<UserEditScreen/>} />
            <Route exact path='/admin/orderlist' element={<OrderListScreen/>} />
            
            <Route exact path = '/search' element={<MainScreen />} />
            <Route exact path = '/search/:keyword' element={<MainScreen />} />
            <Route exact path='/page/:pageNumber' element={<MainScreen/>} />
         
          </Routes>
      </main>
    </Router>
  )
}
// username:- kalorie4@gmail.com
// password:- kalorie@123
// build ka zip

// profile mein password visible --done
// placeorder  == checkout -- done
// fix the filter section in homepage desktop view
// spacing between left and right in product rows
// order ka sort
// banner ka images 
// card overlapping issue
// single page pein image size increase - done
// grams = Kcal - done

// low cal = low-carbs
// remove vegan
// shipping = free done
// tax = 0 done
// heading should be bold in both placeorder and order screen as well as amount alignment - done
// remove pagination done
// display nutrition below the kcal in desktop view d


// about us
// 1st para who are we ? 
// 2nd para why choose us?

export default App;

