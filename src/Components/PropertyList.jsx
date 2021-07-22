import React from 'react';
import '../App.css';

const PropertyList = ({ list, handleEdit, handleDelete }) => {
  console.log(list);
  return (
    <div>
      <h3>List of Properties</h3>
      {list.length > 0 ? (
        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Size</th>
            <th></th>
          </tr>
          {list.map((data) => (
            <tr key={data.id}>
              <td>{data.fields.name}</td>
              <td className='description'>{data.fields.desc}</td>
              <td>{data.fields.size}</td>
              <td className='modifyingButton'>
                <button onClick={() => handleEdit(data)}>Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <div>List of Properties is Empty Click on Add Property button to create One.</div>
      )}
    </div>
  );
};

export default PropertyList;
