import React from 'react';
import {Pagination} from 'react-bootstrap'

const Paginator = ({ incidentsPerPage, totalIncidents, paginate, active }) => {
  
  let items = [];

    
    for (let number = 1; number <= Math.ceil(totalIncidents / incidentsPerPage); number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>,
      );
    }

  return (
     <div>
        <Pagination size="sm">{items}</Pagination>
     </div>
  );
};


export default Paginator;



