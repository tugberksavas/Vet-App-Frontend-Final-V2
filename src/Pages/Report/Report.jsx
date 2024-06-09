import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";

//------------------------------Use State Start-----------------------------
function Report() {
  const [reports, setReports] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  //------------------------------Use State Finish-----------------------------

  //------------------------------Use Effect Start-----------------------------
  useEffect(() => {
    getReports().then((data) => {
      setReports(data.content);
      setSearchResults(data.content);
      console.log(data);
    });
    getAppointments().then((data) => {
      setAppointments(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------Use Effect Start-----------------------------

  //------------------------------New Report Start-----------------------------

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newReport);
  };

  const handleNewReportBtn = () => {
    createReport(newReport)
      .then(() => {
        console.log(newReport);
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0); //ayni randevuya ait rapor varsa alert!
        }, 3000);
      });
  };

  //------------------------------New Report Finish-----------------------------

  //------------------------------Delete Report Start---------------------------
  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Delete Report Finish---------------------------


  //-------------------------Update Appointment Start-----------------------------
  const handleUpdateReportInputs = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateReportBtn = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
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

  const handleUpdateIcon = (report) => {
    setUpdateReport({
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: report.appointment,
      id: report.id,
    });
  };

  //-------------------------Update Appointment Finish-----------------------------

  //------------------------------Search Report Start-----------------------------
  const handleSearch = () => {
    const filteredReport = searchResults.filter((report) =>
      report.title.toLowerCase().includes(search.toLowerCase())
    );
    setReports(filteredReport);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setReports(searchResults);
  };

  return (
    <div className="container">
      {/*--------------------------New Report Input Button------------------------ */}
      <div className="report-newreport">
        <h1>RAPORLAR</h1>
        <h3>Yeni Rapor</h3>
        <input
          type="text"
          placeholder="Baslik"
          name="title"
          value={newReport.title}
          onChange={handleNewReport}
        />
        <input
          type="text"
          placeholder="Teshis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReport}
        />
        <input
          type="number"
          placeholder="Fiyat"
          name="price"
          value={newReport.price}
          onChange={handleNewReport}
        />

        <select
          value={newReport.appointment.id}
          name="appointment"
          onChange={handleNewReport}
        >
          <option value="" disabled={true} selected={true}>
            Randevu Seçin
          </option>
          {appointments.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewReportBtn}>Yukle</button>
        {alert === 1 ? (
          <Alert severity="error">
            Lütfen bilgileri gözden geçirip tekrar deneyin!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Appointment Input Button------------------------ */}
      <div className="report-updatereport">
        <h3>Rapor Guncelle</h3>

        <input
          type="text"
          placeholder="Baslik"
          name="title"
          value={updateReport.title}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="text"
          placeholder="Teshis"
          name="diagnosis"
          value={updateReport.diagnosis}
          onChange={handleUpdateReportInputs}
        />

        <input
          type="number"
          placeholder="Fiyat"
          name="price"
          value={updateReport.price}
          onChange={handleUpdateReportInputs}
        />

        <select name="appointment" onChange={handleUpdateReportInputs}>
          <option value="" disabled={true} selected={true}>
            Randevu Secin
          </option>
          {appointments.map((appointment) => {
            return (
              <option value={appointment.id}>
                {appointment.appointmentDate}
              </option>
            );
          })}
        </select>

        <button onClick={handleUpdateReportBtn}>Guncelle</button>
        {alert === 2 ? (
          <Alert severity="error">Lutfen bir rapor Secin</Alert>
        ) : null}
      </div>

      {/* ---------------------------Search Report Input Button------------------------ */}
      <div className="search-bar">
        <h3>Rapor Sec</h3>

        <input
          type="text"
          placeholder="Rapor ismi girin "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Ara</button>
        <button className="reset" onClick={handleReset}>
          Hepsini Goster
        </button>
      </div>

      {/* ---------------------------List Report------------------------ */}
      <div className="list">
        <h3 className="hover">Rapor Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rapor Basligi</th>
                <th>Hayvan Adi</th>
                <th>Teshis</th>
                <th>Doktor Adi</th>
                <th>Musteri</th>
                <th>Asi Listesi</th>
                <th>Fiyat</th>
                <th>Randevu Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.appointment.animalName}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.appointment.doctorName}</td>
                  <td>{report.appointment.customerName}</td>
                  <td>
                    {report.vaccineList?.map((vaccineLists) => (
                      <span>{vaccineLists.name} , </span>
                    ))}
                  </td>
                  <td>{report.price}</td>
                  <td>{report.appointment.date}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(report)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(report.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Report;
