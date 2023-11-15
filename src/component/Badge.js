import { MDBBadge } from 'mdb-react-ui-kit';
import React from 'react'

const Badge = ({ children, styleInfo }) => {
  const colorKey = {
    Fashion: "primary",
    Music: "success",
    Art: "primary",
    Travel: "warning",
    Fitness: "info",
    Love: "danger",
    Food: "dark",
    Tech: "success",
    Sports: "danger",
    Auto: "warning",
    Aesthetics: "info",
  };

  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children]}
         alignment='center'
         style={{
           margin:"0 38% ",
           justifyItems: "center",
           justifyContent: "center",
         }}>
        {children}
      </MDBBadge>
    </h5>
  )
};

export default Badge
