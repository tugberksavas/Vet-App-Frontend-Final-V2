import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
} from "../../API/vaccine";
import "./Vaccine.css";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import { getVaccinesByDate } from "../../API/vaccine";
import { getVaccineByName } from "../../API/vaccine";
import { getVaccineByAnimalName } from "../../API/vaccine";

//------------------------------Use State-----------------------------
function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [animalSearch, setAnimalSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alert, setAlert] = useState(0);

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: "",
    report: "",
  });

  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: "",
    report: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getVaccines().then((data) => {
      setVaccines(data.content);
      setSearchResults(data.content);
    });
    getAnimals().then((data) => {
      setAnimals(data.content);
    });
    getReports().then((data) => {
      setReports(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Vaccine-----------------------------
  const handleNewVaccine = (event) => {
    if (event.target.name === "animalWithoutCustomer") {
      setNewVaccine({
        ...newVaccine,
        animalWithoutCustomer: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setNewVaccine({
        ...newVaccine,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewVaccineBtn = () => {
    createVaccine(newVaccine)
      .then(() => {
        console.log(newVaccine);
        setReload(true);
        setNewVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animalWithoutCustomer: {
            id: "",
          },
          report: {
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

  //------------------------------Delete Vaccine-----------------------------
  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Vaccine-----------------------------
  const handleUpdateVaccineInputs = (event) => {
    if (event.target.name === "animalWithoutCustomer") {
      setUpdateVaccine({
        ...updateVaccine,
        animalWithoutCustomer: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setUpdateVaccine({
        ...updateVaccine,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateVaccineBtn = () => {
    updateVaccineFunc(updateVaccine)
      .then(() => {
        setReload(true);
        setUpdateVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animalWithoutCustomer: {
            id: "",
          },
          report: {
            id: "",
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

  const handleUpdateIcon = (vaccine) => {
    setUpdateVaccine({
      name: vaccine.name,
      code: vaccine.code,
      protectionStartDate: vaccine.protectionStartDate,
      protectionFinishDate: vaccine.protectionFinishDate,
      animalWithoutCustomer: vaccine.animalWithoutCustomer,
      report: vaccine.report,
      id: vaccine.id,
    });
  };

  //------------------------------Search Vaccine-----------------------------
  const handleSearchVaccineByName = () => {
    getVaccineByName(nameSearch).then((data) => {
      setVaccines(data.content);
    });
  };

  const handleSearchVaccineByAnimalName = () => {
    getVaccineByAnimalName(animalSearch).then((data) => {
      setVaccines(data.content);
    });
  };

  const handleSearchByDates = () => {
    getVaccinesByDate(startDate, endDate).then((data) => {
      setVaccines(data.content);
    });
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setNameSearch("");
    setAnimalSearch("");
    setVaccines(searchResults);
  };

  return (
    <>
      {/*--------------------------New Vaccine Input Button------------------------ */}
      <div className="vaccine-newvaccine">
        <h1>AŞILAR</h1>
        <h3>Aşı Ekle</h3>
        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={newVaccine.name}
          onChange={handleNewVaccine}
        />
        <input
          type="text"
          placeholder="Aşı Kodu"
          name="code"
          value={newVaccine.code}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Protection Start Date"
          name="protectionStartDate"
          value={newVaccine.protectionStartDate}
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          placeholder="Protection Finish Date"
          name="protectionFinishDate"
          value={newVaccine.protectionFinishDate}
          onChange={handleNewVaccine}
        />

        <select
          value={newVaccine.animalWithoutCustomer.id}
          name="animalWithoutCustomer"
          onChange={handleNewVaccine}
        >
          <option value="" disabled={true} selected={true}>
            Hayvan Sec
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select
          value={newVaccine.report.id}
          name="report"
          onChange={handleNewVaccine}
        >
          <option value="" disabled={true} selected={true}>
            Rapor Sec
          </option>
          {reports.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleNewVaccineBtn}>Yükle</button>
        {alert === 1 ? (
          <Alert severity="error">
            Lütfen bilgileri gözden geçirip tekrar deneyin!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Vaccine Input Button------------------------ */}
      <div className="vaccine-updatevaccine">
        <h3>Aşı Güncelle</h3>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={updateVaccine.name}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="text"
          placeholder="Aşı Kodu"
          name="code"
          value={updateVaccine.code}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="date"
          placeholder="Protection Start Date"
          name="protectionStartDate"
          value={updateVaccine.protectionStartDate}
          onChange={handleUpdateVaccineInputs}
        />

        <input
          type="date"
          placeholder="Protection Finish Date"
          name="protectionFinishDate"
          value={updateVaccine.protectionFinishDate}
          onChange={handleUpdateVaccineInputs}
        />

        <select
          value={updateVaccine.animalWithoutCustomer.id}
          name="animal"
          onChange={handleUpdateVaccineInputs}
        >
          <option value="" disabled={true} selected={true}>
            Hayvan Sec
          </option>
          {animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>;
          })}
        </select>

        <select
          value={updateVaccine?.report?.id ? updateVaccine.report.id : ""}
          name="report"
          onChange={handleUpdateVaccineInputs}
        >
          <option value="" disabled={true} selected={true}>
            Rapor Sec
          </option>
          {reports.map((report) => {
            return <option value={report.id}>{report.title}</option>;
          })}
        </select>

        <button onClick={handleUpdateVaccineBtn}>Güncelle</button>
        {alert === 2 ? (
          <Alert severity="error">Lütfen bir aşı seçin!</Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Vaccine Input Button------------------------ */}
      <div className="search-bar-vaccine">
        <div className="search-bar">
          <h3>Aşıyı Isme Göre Ara</h3>

          <input
            type="text"
            placeholder="Aşı'nın Adini Girin "
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <button onClick={handleSearchVaccineByName}>Ara</button>
        </div>

        <div className="search-bar">
          <h3>Aşıyı Hayvana Gore Ara</h3>
          <input
            type="text"
            placeholder="Hayvan Adi Girin "
            value={animalSearch}
            onChange={(e) => setAnimalSearch(e.target.value)}
          />
          <button onClick={handleSearchVaccineByAnimalName}>Ara</button>
        </div>

        <div className="search-bar">
          <h3>Tarih Aralığına Göre Aşı Ara</h3>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearchByDates}>Ara</button>
          <button className="reset-button" onClick={handleReset}>
            Hepsini Goster
          </button>
        </div>
      </div>

      {/* ---------------------------List Vaccine------------------------ */}
      <div className="list">
        <h3>Asi Listesi</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Asi</th>
                <th>Asi Kodu</th>
                <th>Koruma Baslangic Tarihi</th>
                <th>Koruma Bitis Tarihi</th>
                <th>Hayvan Adi</th>
                <th>Rapor Basligi</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td>{vaccine.protectionStartDate}</td>
                  <td>{vaccine.protectionFinishDate}</td>
                  <td>{vaccine.animal.name}</td>
                  <td>{vaccine.report?.title}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(vaccine)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(vaccine.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Vaccine;































