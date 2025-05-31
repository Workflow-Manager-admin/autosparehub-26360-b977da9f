import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * UserAccount component (mock dashboard for logged-in user)
 * Props:
 *  - user: {name, email, orders: [...]}
 *  - onLogout: function
 *  - onBack: function
 */
function UserAccount({ user, onLogout, onBack, onProfileUpdate }) {
  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  function handleEditToggle() {
    setIsEditing((v) => !v);
    setProfile({ name: user.name, email: user.email });
  }

  function handleProfileChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleProfileSave(e) {
    e.preventDefault();
    if (!profile.name.trim() || !profile.email.trim()) return;
    onProfileUpdate(profile);
    setIsEditing(false);
  }

  // Mock some orders (sample on first login)
  const demoOrders = [
    {
      id: 101201,
      items: [
        { name: "Brake Pad Set", qty: 1, price: 119 },
        { name: "Air Filter", qty: 2, price: 31 },
      ],
      total: 119 + 2 * 31,
      status: "Delivered",
      placed: "2024-06-01",
    },
    {
      id: 100876,
      items: [
        { name: "Oil Filter", qty: 1, price: 29 },
      ],
      total: 29,
      status: "Shipped",
      placed: "2024-06-13",
    },
  ];

  const orders = user.orders && user.orders.length > 0 ? user.orders : demoOrders;

  return (
    <section className="account-section" data-testid="account-dashboard">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 style={{marginBottom: 5}}>My Dashboard</h2>
        <button className="btn btn-small btn-secondary" onClick={onLogout}>Logout</button>
      </div>

      <div className="account-profile" style={{marginBottom:28, marginTop: -6}}>
        <h3>Profile</h3>
        {!isEditing ? (
          <div style={{fontSize: 17}}>
            <div><b>Name:</b> {user.name}</div>
            <div><b>Email:</b> {user.email}</div>
            <button className="btn btn-small btn-secondary" style={{marginTop:9}} onClick={handleEditToggle}>Edit</button>
          </div>
        ) : (
          <form onSubmit={handleProfileSave} style={{maxWidth:300}}>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={profile.name} onChange={handleProfileChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={profile.email} onChange={handleProfileChange} required type="email" />
            </div>
            <div className="checkout-actions" style={{marginTop: 6}}>
              <button type="submit" className="btn btn-small">Save</button>
              <button className="btn btn-small btn-secondary" type="button" onClick={handleEditToggle}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      <div className="account-orders">
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <div style={{color:"#666", marginBottom:12}}>No orders yet.</div>
        ) : (
          <table className="orders-table" style={{width:"100%", borderCollapse:"collapse", fontSize:15, marginBottom:16}}>
            <thead>
              <tr>
                <th style={{textAlign:"left",padding:"7px 4px"}}>Order #</th>
                <th style={{textAlign:"left",padding:"7px 4px"}}>Date</th>
                <th style={{textAlign:"left",padding:"7px 4px"}}>Status</th>
                <th style={{textAlign:"left",padding:"7px 4px"}}>Items</th>
                <th style={{textAlign:"left",padding:"7px 4px"}}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="order-row" style={{borderTop:"1px solid #eee"}}>
                  <td style={{padding:"7px 4px", fontWeight:600}}>{order.id}</td>
                  <td style={{padding:"7px 4px"}}>{order.placed}</td>
                  <td style={{padding:"7px 4px"}}>{order.status}</td>
                  <td style={{padding:"7px 4px"}}>
                    {order.items.map(item => (
                      <span key={item.name}>{item.name} x{item.qty}<br /></span>
                    ))}
                  </td>
                  <td style={{padding:"7px 4px", color:"var(--accent-color)",fontWeight:600}}>
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button className="btn btn-secondary" onClick={onBack}>Back to Catalog</button>
    </section>
  );
}

export default UserAccount;
