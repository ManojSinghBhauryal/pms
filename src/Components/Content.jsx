import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import '../App.css';

const Content = () => {
  const [showFrom, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [size, setSize] = useState('');
  const [editedDataId, setEditedDataId] = useState();
  const handleShowForm = () => {
    setShowForm(!showFrom);
  };
  const settingToEmpty = () => {
    setName('');
    setDesc('');
    setSize('');
  };
  const handleFormSubmit = (e) => {
    setList(list.concat({ id: Math.floor(Math.random() * 1000), name: name, desc: desc, size: size }));
    settingToEmpty();
    e.preventDefault();
  };

  const handleEdit = (data) => {
    setEditedDataId(data.id);
    setName(data.name);
    setDesc(data.desc);
    setSize(data.size);
    setEdit(true);
  };
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
    setEdit(false);
    settingToEmpty();
  };
  const handleFormEdit = (e) => {
    e.preventDefault();
    const editedList = list.filter((data) => data.id === editedDataId);
    editedList[0].name = name;
    editedList[0].desc = desc;
    editedList[0].size = size;
    setList(list);
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
