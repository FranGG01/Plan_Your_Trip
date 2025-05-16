import React from "react";
import DropdownList from "../DropdownList/DropdownList";

const categorias = [
  "Alojamiento",
  "Gastronomía",
  "Tours",
  "Transporte",
  "Presupuesto",
];

function MultiDropdown() {
  const [openCategory, setOpenCategory] = useState(null);
  const toggleCategory = (categoria) => {
    setOpenCategory((prev) => (prev === categoria ? null : categoria));
    return (
      <div className="multi-dropdown-container">
        {categorias.map((categoria) => (
          <DropdownList
            key={categoria}
            categoria={categoria}
            isOpen={openCategory === categoria}
            toggleCategory={toggleCategory}
          />
        ))}
      </div>
    );
  };
}

export default MultiDropdown;
