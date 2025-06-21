import React from 'react';
import './ConfigCard.css';

const ConfigCard = ({ title, icon, fields, data, onChange, onSubmit, btnLabel }) => (
  <div className="config-card">
    <h2 className="config-title">
      <i className={icon} /> {title}
    </h2>

    <form
      className="config-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {fields.map(({ label, name, type }) => (
        <div className="form-group" key={name}>
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={data[name]}
            onChange={onChange}
            required
          />
        </div>
      ))}

      <button type="submit" className="submit-btn">
        {btnLabel}
      </button>
    </form>
  </div>
);

export default ConfigCard;
