import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

//------------------------------Use State-----------------------------

function AvailableDate() {
  const [availableDates, setAvailableDates] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);

  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data.content);
      setSearchResults(data.content);
      console.log(data);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Available Date-----------------------------
  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newAvailableDate);
  };

  const handleNewAvailableDateBtn = () => {
    createAvailableDate(newAvailableDate)
      .then(() => {
        setReload(true);
        setNewAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //------------------------------Delete Available Date-----------------------------
  const handleDelete = (id) => {
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Available Date-----------------------------
  const handleUpdateAvailableDateInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAvailableDateBtn = () => {
    updateAvailableDateFunc(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          availableDate: "",
          doctor: {
            id: "",
            name: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
    console.log(updateAvailableDate);
  };

  const handleUpdateIcon = (availableDate) => {
    setUpdateAvailableDate({
      availableDate: availableDate,
      doctor: availableDate.doctor,
      id: availableDate.id,
    });
    console.log(availableDate)
  };

  //------------------------------Search Availablel Date-----------------------------
  const handleInputSelect = (event) => {
    setSearch(event.target.value);
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newAvailableDate);
  };

  const handleSearch = () => {
    const filteredAvailableDate = searchResults.filter((availableDate) =>
      availableDate.availableDate.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableDates(filteredAvailableDate);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setAvailableDates(searchResults);
  };

  return (
    <>
      {/*--------------------------New AvailableDate Input Button------------------------ */}
      <h1 className="available-date-h1">Mevcut Tarih Yönetimi </h1>
      <div className="availabledate-buttons">
        <div className="availabledate-newawailabledate">
          <h3 className="available-h3">Yeni Tarih Ekle</h3>

          <select
            value={newAvailableDate.doctor.id}
            name="doctorId"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true} selected={true}>
              Doktor Sec
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>
          <input
            type="date"
            placeholder="Available Date"
            name="workDay"
            value={newAvailableDate.workDay}
            onChange={handleNewAvailableDate}
          />

          <button onClick={handleNewAvailableDateBtn}>Ekle</button>
          {alert === 1 ? (
            <Alert severity="error">
              Lütfen bilgileri gözden geçirip tekrar deneyin!
            </Alert>
          ) : null}
        </div>

        {/*--------------------------Update AvailableDate Input Button------------------------ */}
        <div className="availabledate-updateavailabledate">
          <h3 className="available-h3">Tarih Güncelle</h3>
          <div>
            <input
              disabled
              style={{ marginBottom: "10px" }}
              value={`Doktor Adı: ${updateAvailableDate.doctor.name || ""}`}>
            </input>
          </div>

          <input
            type="date"
            placeholder="Available Date"
            name="availableDate"
            value={updateAvailableDate.availableDate.workDay}
            onChange={handleUpdateAvailableDateInputs}
          />

          <button onClick={handleUpdateAvailableDateBtn}>Güncelle</button>
          {alert === 2 ? (
            <Alert severity="error">"Lütfen uygun bir tarih seçin!"</Alert>
          ) : null}
        </div>

        {/* ---------------------------Search AvailableDate Input Button------------------------ */}
        <div className="search-bar">
          <h3 className="available-h3">Tarihe Uygun Arama</h3>

          <select value={search} name="doctor" onChange={handleInputSelect}>
            <option value="" disabled={true} selected={true}>
              Doktor Sec
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>

          <input
            type="date"
            placeholder="Enter date... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Ara</button>
          <button className="reset" onClick={handleReset}>
            Hepsini Göster
          </button>
        </div>
      </div >

      {/* ------------------------------------------------------ */}
      < div className="list" >
        <h3>Mevcut Tarih Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Uygun tarih</th>
                <th>Telefon Numarasi</th>
                <th>Email</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {availableDates.map((availableDate) => (
                <tr key={availableDate.id}>
                  <td>{availableDate.doctor.name}</td>
                  <td>{availableDate.workDay}</td>
                  <td>{availableDate.doctor.phone}</td>
                  <td>{availableDate.doctor.email}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(availableDate)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(availableDate.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
}

export default AvailableDate;
