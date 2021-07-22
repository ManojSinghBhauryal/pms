import React, { useState, useEffect } from 'react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import '../App.css';
import Airtable from 'airtable';
import axios from 'axios';

//create a new Airtable object in React
const base = new Airtable({ apiKey: 'key8qzNV2pfAXbk2W' }).base('appmI15l998LEQdiV');
//base endpoint to call with each request
axios.defaults.baseURL = 'https://api.airtable.com/v0/appmI15l998LEQdiV/map/';
//content type to send with all POST requests
axios.defaults.headers.post['Content-Type'] = 'application/json';
//authenticate to the base with the API key
axios.defaults.headers['Authorization'] = 'Bearer key8qzNV2pfAXbk2W';

const Content = () => {
  const [showFrom, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [size, setSize] = useState('');
  const [editedDataId, setEditedDataId] = useState();
  useEffect(() => {
    base('Table 1')
      .select({
        view: 'Grid view',
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(records);
        setList(records);
      });
  }, []);
  const settingToEmpty = () => {
    setName('');
    setDesc('');
    setSize('');
  };
  const handleShowForm = () => {
    setShowForm(!showFrom);
    settingToEmpty();
    setEdit(false);
  };
  const handleFormSubmit = (e) => {
    base('Table 1').create(
      {
        name: name,
        desc: desc,
        size: parseInt(size),
      },

      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setList(list.concat(records));
      }
    );
    settingToEmpty();
    e.preventDefault();
  };

  const handleEdit = (data) => {
    console.log(data);
    setShowForm(true);
    setEditedDataId(data.id);
    setName(data.fields.name);
    setDesc(data.fields.desc);
    setSize(data.fields.size);
    setEdit(true);
  };
  const handleDelete = (id) => {
    base('Table 1').destroy(id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
    });
    setList(list.filter((item) => item.id !== id));
    setEdit(false);
    settingToEmpty();
  };
  const handleFormEdit = (e) => {
    e.preventDefault();
    base('Table 1').update(
      editedDataId,
      {
        name: name,
        desc: desc,
        size: parseInt(size),
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        const newList = list.filter((item) => item.id !== record.id);
        setList(newList.concat(record));
      }
    );
    setEdit(false);
    settingToEmpty();
  };
  return (
    <div className='mainContent'>
      <div>
        <button onClick={handleShowForm}>{!showFrom ? <>Add Property</> : <>Close Property</>}</button>
      </div>
      <div className='content'>
        <PropertyList list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
        <div>
          {showFrom ? (
            <div>
              <PropertyForm handleFormEdit={handleFormEdit} edit={edit} name={name} setName={setName} setDesc={setDesc} setSize={setSize} desc={desc} size={size} handleFormSubmit={handleFormSubmit} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Content;
