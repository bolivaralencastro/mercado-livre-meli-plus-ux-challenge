'use client';

import React from "react";

interface AndesSwitchProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const AndesSwitch: React.FC<AndesSwitchProps> = ({
  id,
  label,
  checked = false,
  onChange,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const baseClass = "andes-switch";
  const combinedClassName = [baseClass, className].filter(Boolean).join(" ");

  return (
    <label className={combinedClassName}>
      <span className="andes-switch__label">
        <span className="andes-switch__title">{label}</span>
      </span>

      <input
        className="andes-switch__input"
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleChange}
      />

      <div className="andes-switch__slider"></div>
    </label>
  );
};

export default AndesSwitch;
