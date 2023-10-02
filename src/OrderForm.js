import React, { useState } from 'react';
import './OrderForm.css'; // Import the CSS file

const OrderForm = () => {
  const [formData, setFormData] = useState({
    itemName: '', 
    quantity:0,
    customer_id:'',
    delivery_address:'',
    route_id:''
  });

  const [orderList, setOrderList] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission (e.g., send data to server)
    console.log('Form submitted:', formData.customer_id,formData.delivery_address,formData.route_id);
    // Reset form data
    setFormData({ customer_id: '', delivery_address: '',route_id: '',quantity:0,itemName: '' });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // List of available products
  const availableProducts = [
    { id: 1, name: 'Product A', details: 'Description of Product A' },
    { id: 2, name: 'Product B', details: 'Description of Product B' },
    // Add more products as needed
  ];

  return (
    <div>
      <h2 className='navbar'>Order details</h2>  
       
      <main className='form-details'>
        <form onSubmit={handleSubmit}>
        <p className="order-list-title">Order List</p>
        {orderList.length > 0 ? (
            <ul className="order-list">
                {orderList.map((order, index) => (
                <li key={index}>{`${order.itemName} - Quantity: ${order.quantity}`}</li>
                ))}
            </ul>
        ) : (
            <p>No items added yet</p>
        )}

        <label className='item-detail'>
            Customer ID:
            <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            />
        </label>
        <br />
        <label className='item-detail'>
        Delivery Address:
        <input
          type="text"
          name="delivery_address"
          value={formData.delivery_address}
          onChange={handleChange}
        />
        </label>
        <br />
        <label className='item-detail'>
            Route ID:
            <input
            type="text"
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            />
        </label>
        <br/>
            <button type="submit" className='submit-button'>Place Order</button>
        </form>       
    </main> 


      <h3>Available Products</h3>
      {availableProducts.map((product) => (
        <div key={product.id} className='product-content'>
          <h4>{product.name}</h4>
          <p>{product.details}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          <button className='add-button'
            onClick={() => {
              setOrderList([...orderList, {...orderList, quantity:formData.quantity, itemName: product.name }]);
            
            }}
          >
            Add to Order
          </button>
          </label>
        </div>
      ))}

    </div>
  );
};

export default OrderForm;