import React from 'react'   

const DeliveryPolicyScreen = () => {
    return (
        <div style={{height:"100%",width:"100vw",background:"white", justifyContent:"center",margin:"auto"}}>
            <h4 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",fontSize:"22px"}}>Delivery Orders</h4>
            <h4 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Delivery orders are accepted if the following criteria are met :</h4>
            <p style={{width:"90%",color:"black",fontSize:"18px"}}>
                <ul>
                    <li>The customer's delivery location falls within the permitted delivery zone of the designated Kalorie.</li>
                    <li>The delivery address being mapped to the nearest outlet that delivers in the customer's delivery location.</li>
                    <li>Online availability of the outlet to accept and process the order.</li>
                    <li>In the event, the customer's delivery location is not listed within the permitted delivery zone of the outlet, the order cannot be placed. However, you may choose to pick up your order from the nearest Kalorie.</li>
                </ul>
            </p>
            <h4 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Menu</h4>
            <p style={{width:"90%",color:"black",fontSize:"18px"}}>
                <ul>
                    <li>The menu is displayed as per the availability of the menu items in the Website.</li>
                    <li>In case certain items from the menu are not listed, the particular outlet does not carry those items on their menu.</li>
                    <li>In case of non-availability of ordered menu items at the selected outlet, the order will not be executed and will be duly informed to the customer.</li>
                </ul>
            </p>
            <h4 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Delivery Orders :</h4>
            <p style={{width:"90%",color:"black",fontSize:"18px"}}>
                <ul>
                <li>The customer may only use the coupon codes, promotional emails & SMS messages for placing an order via the Kalorie website.</li>
<li>The complete and accurate coupon code must be entered in the coupon section on the payment page before completing the transaction, in order to avail the discount.</li>
                <li>The coupon code is not case sensitive.</li>
                <li>The coupon code may not work if the conditions defined in the coupon T&C are not met in the order.</li>
                <li>Kalorie holds the right to accept or reject any coupon without giving any reason whatsoever.</li>
                <li>All coupons carry a validity period, mentioned in the coupon T&C and will not be accepted after the expiry of the validity period.</li>
                <li>The customer must handover the coupon which is entered in the coupon section while placing the order to the delivery person, failing which the order may be cancelled.</li>
                <li>Terms & Conditions for all coupons including printed, mobile and email coupons</li>
                <li>A coupon/promotion cannot be clubbed with any other offer or scheme.</li>
                <li>Only one coupon is valid per order.</li>
                <li>Coupons are only valid on the Kalorie website.</li>
                <li>All prices are exclusive of taxes.</li>
                
                </ul>
            </p>
            <h4 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Modify/Cancel the online order :</h4>
            <p style={{width:"90%",color:"black",fontSize:"18px"}}>
                <ul>
                <li>Orders once placed cannot be modified or cancelled either online or by the call centre.</li>
<li>Orders once placed cannot be modified or cancelled either online or by the call centre.</li>
                <li>In the event an order which is paid via credit card is cancelled due to non-availability of the ordered product, the amount will be reversed back to the customer. The transaction will reflect in the next month statement.</li>
                <li>Kalorie holds the right to accept or reject any coupon without giving any reason whatsoever.</li>
                <li>Kalorie terms an order with 6 or more All-in-1 meals as a bulk order.</li>
                <li>Food from Kalorie is for immediate consumption only (within 30 minutes from time of delivery).</li>
                
                </ul>
            </p>
            
        </div>
    )
}

export default DeliveryPolicyScreen
