import React from 'react';
import '../App.css';
const PropertyForm = ({ edit, handleFormEdit, handleFormSubmit, name, desc, size, setName, setDesc, setSize }) => {
  return (
    <>
      <div className='propertyFormMain'>
        <h3>Property Form</h3>
        <form className='formMain' onSubmit={edit ? handleFormEdit : handleFormSubmit}>
          <label>Name: </label>
          <input name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
          <br />
          <label>Description: </label>
          <textarea name='desc' type='text' value={desc} onChange={(e) => setDesc(e.target.value)} required />
          <br />
          <label>
            Size <sub>in Square km</sub>:
          </label>
          <input name='size' type='number' value={size} onChange={(e) => setSize(e.target.value)} required />
          <br />
          {edit ? <button>Edit</button> : <button>Add</button>}
        </form>
      </div>
    </>
  );
};

export default PropertyForm;
