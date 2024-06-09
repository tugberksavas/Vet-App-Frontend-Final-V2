import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
  getDoctorByName,
} from "../../API/doctor";
import "./Doctor.css";

//------------------------------Use State Start-----------------------------
function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [doctorSearch, setDoctorSearch] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  //------------------------------Use State Finish-----------------------------

  //------------------------------Use Effect Start-----------------------------
  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data.content);
      setSearchResults(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------Use Effect Finish-----------------------------

  //------------------------------New Doctor Start-----------------------------
  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
    console.log(newDoctor);
  };

  const handleNewDoctorBtn = () => {
    createDoctor(newDoctor)
      .then(() => {
        console.log(newDoctor);
        setReload(true);
        setNewDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //------------------------------New Doctor Finish-----------------------------

  //------------------------------Delete Doctor Start-----------------------------
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Delete Doctor Finish-----------------------------

  //------------------------------Update Doctor Start-----------------------------
  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (doctor) => {
    setUpdateDoctor({
      name: doctor.name,
      email: doctor.email,
      address: doctor.address,
      city: doctor.city,
      phone: doctor.phone,
      id: doctor.id,
    });
  };

  //------------------------------Update Doctor Finish-----------------------------

  //------------------------------Search Doctor Start-----------------------------
  const handleSearchDoctorByName = () => {
    getDoctorByName(doctorSearch).then((data) => {
      setDoctors(data.content);
    });
  };

  const handleReset = () => {
    setDoctorSearch("");
    setDoctors(searchResults);
  };

  return (
    <>
      {/*--------------------------New Doctor Input Button------------------------ */}
      <div className="container">
        <div className="doctor-newdoctor">
          <h1>DOKTORLAR</h1>
          <h3>Doktor Ekle</h3>
          <input
            type="text"
            placeholder="Adi Soyadi"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Telefon Numarasi"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newDoctor.email}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Sehir"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctor}
          />
          <button onClick={handleNewDoctorBtn}>Ekle</button>
          {alert === 1 ? (
            <Alert severity="error">
              Lütfen bilgileri gözden geçirip tekrar deneyin!
            </Alert>
          ) : null}
        </div>

        {/*--------------------------Update Doctor Input Button------------------------ */}
        <div className="doctor-updatedoctor">
          <h3>Doktor Güncelle</h3>

          <input
            type="text"
            placeholder="Adi Soyadi"
            name="name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Telefon Numarasi"
            name="phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Sehir"
            name="city"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputs}
          />
          <button onClick={handleUpdateDoctorBtn}>Güncelle</button>
          {alert === 2 ? (
            <Alert severity="error">Lütfen doktor seçiniz!</Alert>
          ) : null}
        </div>

        {/* ---------------------------Search Customer Input Button------------------------ */}
        <div className="search-bar">
          <h3>Doktor Ara</h3>
          <input
            type="text"
            placeholder="Doktor İsmi Girin "
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchDoctorByName}>
            Ara
          </button>
          <button className="reset-button" onClick={handleReset}>
            Hepsini Göster
          </button>
        </div>

        {/* ------------------------------List Doctor ----------------------------- */}
        <div className="list">
          <h3>Doktor Listesi</h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Doktor Adi Soyadi</th>
                  <th>Telefon Numarasi</th>
                  <th>Adres</th>
                  <th>Sehir</th>
                  <th>Email</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.address}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <span onClick={() => handleUpdateIcon(doctor)}>
                        <UpdateIcon />
                      </span>
                      <span onClick={() => handleDelete(doctor.id)}>
                        <DeleteIcon />
                      </span>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
export default Doctor;
