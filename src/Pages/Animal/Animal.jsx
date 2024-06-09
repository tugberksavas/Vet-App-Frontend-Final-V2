import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";
import { getAnimalByCustomerName } from "../../API/animal";

//------------------------------Use State Start-----------------------------

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: "",
    id: "",
  });

  //------------------------------Use State Finish-----------------------------

  //------------------------------Use Effect Start-----------------------------
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data.content);
      setSearchResults(data.content);
    });
    getCustomers().then((data) => {
      setCustomers(data.content);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Animal-----------------------------

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
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

  //------------------------------Use Effect Finish-----------------------------

  //------------------------------Delete Animal Start-----------------------------

  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Delete Animal Finish-----------------------------

  //------------------------------Update Animal Start-----------------------------

  const handleUpdateAnimalInputs = (event) => {
    if (event.target.name === "customer") {
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdateAnimalBtn = () => {
    updateAnimalFunc(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {
            id: "",
          },
          id: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (animal) => {
    setUpdateAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: animal.customer,
      id: animal.id,
    });
  };

  //------------------------------Update Animal Finish-----------------------------

  //------------------------------Search Animal Start-----------------------------
  const handleSearchAnimalByName = () => {
    getAnimalByName(search).then((data) => {
      setAnimals(data.content);
    });
  };
  const handleSearchAnimalByCustomerName = () => {
    getAnimalByCustomerName(customerSearch).then((data) => {
      setAnimals(data.content);
      console.log(data);
    });
  };
  const handleReset = () => {
    setSearch("");
    setCustomerSearch("");
    setAnimals(searchResults);
  };

  return (
    <div className="container">
      {/*--------------------------New Animal Input Button------------------------ */}
      <div className="animal-newanimal">
        <h1>HAYVANLAR</h1>
        <h3>Yeni Hayvan Ekle</h3>
        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Türü"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Cinsiyet"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Rengi"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />

        <select
          value={newAnimal.customer.id}
          name="customer"
          onChange={handleNewAnimal}
        >
          <option value="" disabled={true} selected={true}>
            Müşteri Seçin
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleNewAnimalBtn}>Ekle</button>
        {alert === 1 ? (
          <Alert severity="error">
            Lütfen bilgileri gözden geçirip tekrar deneyin!
          </Alert>
        ) : null}
      </div>

      {/*--------------------------Update Animal Input Button------------------------ */}
      <div className="animal-updateanimal">
        <h3>Hayvan Güncelleme</h3>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Türü"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Cinsiyet"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="text"
          placeholder="Rengi"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalInputs}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputs}
        />
        <select
          value={updateAnimal.customer.id}
          name="customer"
          onChange={handleUpdateAnimalInputs}
        >
          <option value="" disabled={true} selected={true}>
            Müşteri Seçin
          </option>
          {customers.map((customer) => {
            return <option value={customer.id}>{customer.name}</option>;
          })}
        </select>

        <button onClick={handleUpdateAnimalBtn}>Güncelle</button>
        {alert === 2 ? (
          <Alert severity="error">Lütfen bir hayvan seçin</Alert>
        ) : null}
      </div>

      {/*--------------------------Search Animal Input Button------------------------ */}

      <div className="search-bar-animal">
        <div className="search-bar">
          <h3>Hayvan Ara</h3>
          <input
            type="text"
            placeholder="Hayvan Ismi Girin"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearchAnimalByName}>Ara</button>
        </div>

        <div className="search-bar">
          <h3>Müşteri Ara</h3>
          <input
            type="text"
            placeholder="Müşteri Ismini Girin "
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />
          <button onClick={handleSearchAnimalByCustomerName}>Ara</button>
        </div>
        <div className="search-bar-reset">
          <button className="show-all" onClick={handleReset}>
            Hepsini Göster
          </button>
        </div>
      </div>

      {/* ------------------------------List Animal ----------------------------- */}
      <div className="list">
        <h3>Hayvan Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Adi</th>
                <th>Türü</th>
                <th>Breed</th>
                <th>Cinsiyeti</th>
                <th>Rengi</th>
                <th>Doğum Tarihi</th>
                <th>Müşteri Adi</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>

                  <td>
                    <span onClick={() => handleUpdateIcon(animal)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(animal.id)}>
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

export default Animal;
