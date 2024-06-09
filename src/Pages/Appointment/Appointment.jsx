import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentByDateDoctor,
  getAppointmentByDateAnimal,
} from "../../API/appointment";
import "./Appointment.css";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";

//------------------------------Use State Start ----------------------------- 

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  //------------------------------Use State Finish -----------------------------   

  //------------------------------Use Effect Start------------------------------
  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data.content);
      setSearchResults(data.content);
    });
    getDoctors().then((data) => {
      setDoctors(data.content);
    });
    getAnimals().then((data) => {
      setAnimals(data.content);
    });

    setReload(false);
  }, [reload]);

  //------------------------------Use Effect Finish-----------------------------

  //------------------------New Appointment Start -------------------------------

  const handleNewAppointment = (event) => {
    if (event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "animal") {
      setNewAppointment({
        ...newAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newAppointment);
  };

  const handleNewAppointmentBtn = () => {
    createAppointment(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
          animal: {
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

  //------------------------New Appointment Finish -------------------------------

  //-------------------------Delete Appointment Start-----------------------------
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  //-------------------------Delete Appointment Finish-----------------------------

  //--------------------------Update Appointment Start-----------------------------

  const handleUpdateAppointmentInputs = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAppointment({
        ...updateAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "animal") {
      setUpdateAppointment({
        ...updateAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAppointmentBtn = () => {
    updateAppointmentFunc(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
          animal: {
            id: ""
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctor: appointment.doctor,
      animal: appointment.animal,
      id: appointment.id,
    });
  };

  //--------------------------Update Appointment Finish--------------------------

  //------------------------Search Appointment Start-----------------------------
  //Doctor-Dates
  const handleSearchDoctorChange = (event) => {
    setDoctorId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleDoctorDateSearchBtn = () => {
    getAppointmentByDateDoctor(appointmentDate, doctorId).then((data) => {
      setAppointments(data.content);
    });
  };

  //Animal-Dates
  const handleSearchAnimalChange = (event) => {
    setAnimalId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleAnimalDateSearchBtn = () => {
    getAppointmentByDateAnimal(appointmentDate, animalId).then((data) => {
      setAppointments(data.content);
    });
  };

  const handleReset = () => {
    setSearch("");
    setDoctorId("");
    setAnimalId("");
    setAppointments(searchResults);
  };

  return (
    <div className="container">
      {/*--------------------------New Appointment Input Button------------------------ */}
      <div className="appointment-newappointment">
        <h1>RANDEVULAR</h1>

        <h3>Yeni Randevu Ekle</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select
          value={newAppointment.doctor.id}
          name="doctor"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Doktor Sec
          </option>
          {doctors.map((doctor) => {
            return (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            );
          })}
        </select>

        <select
          value={newAppointment.animal.id}
          name="animal"
          onChange={handleNewAppointment}
        >
          <option value="" disabled={true} selected={true}>
            Hayvan sec
          </option>
          {animals.map((animal) => {
            return (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Yükle</button>
        {alert === 1 ? (
          <Alert severity="error">
            Lütfen bilgileri gözden geçirip tekrar deneyin!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Appointment Input Button------------------------ */}
      <div className="appointment-updateappointment">
        <h3>Randevu Guncelle</h3>

        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={updateAppointment.workDay}
          onChange={handleUpdateAppointmentInputs}
        />

        <select
          value={updateAppointment.doctor.id}
          name="doctor"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Randevu Sec
          </option>
          {doctors.map((doctor) => {
            return <option value={doctor.id}>{doctor.name}</option>;
          })}
        </select>

        <select
          value={updateAppointment.animal.id}
          name="animal"
          onChange={handleUpdateAppointmentInputs}
        >
          <option value="" disabled={true} selected={true}>
            Hayvan Sec
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAppointmentBtn}>Güncelle</button>
        {alert === 2 ? (
          <Alert severity="error">Lütfen bir randevu seçin!</Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Appointment Input Button------------------------ */}
      <div className="search-bar-appointment">
        <div className="search-bar">
          <h3>Doktora ve Tarihe Göre Randevu Ara</h3>

          <select
            value={doctorId}
            name="doctor"
            onChange={handleSearchDoctorChange}
          >
            <option value="" disabled={true} selected={true}>
              Doktor Sec
            </option>
            {doctors.map((doctor) => {
              return <option value={doctor.id}>{doctor.name}</option>;
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date "
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

          <button onClick={handleDoctorDateSearchBtn}>Ara</button>
        </div>

        {/* ----------------------------------------------------- */}

        <div className="search-bar">
          <h3>Hayvan Adına ve Tarihine Göre Randevu Arama</h3>

          <select
            value={animalId}
            name="animal"
            onChange={handleSearchAnimalChange}
          >
            <option value="" disabled={true} selected={true}>
              Hayvan Sec
            </option>
            {animals.map((animal) => {
              return <option value={animal.id}>{animal.name}</option>;
            })}
          </select>

          <input
            type="datetime-local"
            placeholder="start-date "
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

          <button onClick={handleAnimalDateSearchBtn}>Ara</button>
        </div>

        <button className="reset" onClick={handleReset}>
          Hepsini Goster
        </button>
      </div>

      {/* ---------------------------List Appointment Start------------------------ */}
      <div className="list">
        <h3>Randevu Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Doktor</th>
                <th>Randevu Tarihi</th>
                <th>Hayvan</th>
                <th>Musteri</th>
                <th>Musteri Telefon</th>
                <th>Doktor Telefon</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.animal.name}</td>
                  <td>{appointment.animal.customer.name}</td>
                  <td>{appointment.animal.customer.phone}</td>
                  <td>{appointment.doctor.phone}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(appointment)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(appointment.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------List Appointment Finish------------------------ */}
    </div>
  );
}

export default Appointment;
