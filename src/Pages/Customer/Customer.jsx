import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomerByName,
} from "../../API/customer";
import "./Customer.css";

//------------------------------Use State Start-----------------------------
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  //------------------------------Use State Finish-----------------------------

  //------------------------------Use Effect Start-----------------------------
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data.content);
      setSearchResults(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------Use Effect Finish-----------------------------

  //------------------------------New Customer Start-----------------------------
  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    console.log(newCustomer);
  };

  const handleNewCustomerBtn = () => {
    console.log(newCustomer);
    createCustomer(newCustomer)
      .then(() => {
        setReload(true);
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };
  console.log(customers);

  //------------------------------New Customer Finish-----------------------------

  //------------------------------Delete Customer Start-----------------------------
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

   //------------------------------Delete Customer Finish-----------------------------

  //------------------------------Update Customer Start-----------------------------
  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer)
      .then(() => {
        setReload(true);
        setUpdateCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (customer) => {
    console.log(customer);
    setUpdateCustomer(customer);
  };

  //------------------------------Update Customer Finish-----------------------------

  //------------------------------Search Customer Start-----------------------------
  const handleSearchCustomerByName = () => {
    getCustomerByName(customerSearch).then((data) => {
      setCustomers(data.content);
    });
  };

  const handleReset = () => {
    setCustomerSearch("");
    setCustomers(searchResults);
  };

  return (
    <div className="container">
      {/*--------------------------New Customer Input Button------------------------ */}
      <div className="customer-newcustomer">
        <h1>Müşteriler</h1>
        <h3>Yeni Müşteri</h3>

        <input
          type="text"
          placeholder="Müşteri Adi"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Telefon Numarasi"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newCustomer.email}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />

        <button onClick={handleNewCustomerBtn}>Yükle</button>
        {alert === 1 ? (
          <Alert severity="error">
            Lütfen bilgileri gözden geçirip tekrar deneyin!
          </Alert>
        ) : null}
      </div>

      {/* -------------------------Update Customer Input Button------------------------ */}
      <div className="customer-updatecustomer">
        <h3>Müşteri Güncelle</h3>

        <input
          type="text"
          placeholder="Müşteri Adi"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Telefon Numarasi"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />
        <button onClick={handleUpdateCustomerBtn}>Güncelle</button>
        {alert === 2 ? (
          <Alert severity="error">Lütfen bir müşteri seçin!</Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Customer Input Button------------------------ */}
      <div className="search-bar">
        <h3>Müşteri Ara</h3>
        <input
          type="text"
          placeholder="Adini Girin"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchCustomerByName}>
          Ara
        </button>
        <button className="reset-button" onClick={handleReset}>
          Hepsini Göster
        </button>
      </div>

      {/* ------------------------------List Customer  Start ----------------------------- */}
      <div className="list">
        <h3>Müşteri Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Müsteri Adi Soyadi</th>
                <th>Telefon</th>
                <th>Adres</th>
                <th>Sehir</th>
                <th>Email</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.email}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(customer)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(customer.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* ------------------------------List Customer  Finish ----------------------------- */}
    </div>
  );
}
export default Customer;
