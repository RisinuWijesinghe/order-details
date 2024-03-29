import React, { useState } from 'react';
import './OrderForm.css'; 

const OrderForm = () => {
  const [formData, setFormData] = useState({
    itemName: '', 
    quantity:0,
    customer_id:'',
    delivery_address:'',
    route_id:''
  });

  const [orderList, setOrderList] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission (e.g., send data to server)
    console.log('Form submitted:', formData.customer_id,formData.delivery_address,formData.route_id,orderList);
    setFormData({ customer_id: '', delivery_address: '',route_id: '',quantity:0,itemName: '' });
    setOrderList([])
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (index) => {
    const updatedOrderList = [...orderList];
    updatedOrderList.splice(index, 1);
    setOrderList(updatedOrderList);
};

const handleOrder = (product) => {
  const existingItemIndex = orderList.findIndex((item) => item.itemName === product.name);

  if (existingItemIndex !== -1) {
    const updatedOrderList = [...orderList];
    updatedOrderList[existingItemIndex].quantity = formData.quantity;
    setOrderList(updatedOrderList);
  } else {
    setOrderList((prevOrderList) => [
      ...prevOrderList,
      { itemName: product.name, quantity: formData.quantity },
    ]);
  }
};


  const availableProducts = [
    { id: 1, name: 'Product A', details: 'Description of Product A' },
    { id: 2, name: 'Product B', details: 'Description of Product B' },
    { id: 3, name: 'product C', details: 'Description of Product C' },
    { id: 4, name: 'Product D', details: 'Description of Product D' },
    // Add more products as needed
  ];
      
  return (
    <div>
      <h2 className='navbar'>Order details</h2>  
       
      <main className='form-details'>
    <form onSubmit={handleSubmit}>

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

        <p className="order-list-title">Order List</p>
        
        {orderList.length > 0 ? (
            <ul className="order-list">
                {orderList.map((order, index) => (
                    <li key={index}>
                        {`${order.itemName} - Quantity: ${order.quantity}`}
                        <button  className="delete-button" onClick={() => handleDelete(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No items added yet</p>
        )}        

    </main> 



      <h3>Available Products</h3>
      <div className='grid-container'>
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
            onClick={() =>
              handleOrder(product)
            }
          >
            Add Item
          </button>
          </label>
        </div>
      ))}
      </div>

    </div>
  );
};

export default OrderForm;
