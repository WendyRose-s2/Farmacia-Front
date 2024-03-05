import React from 'react';
import CardProduto from '../cardProduto/CardProduto';


function ListaProdutos() {
 
  return (
    <>
  
      <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
       
          <CardProduto  />
        
      </div>
    </>
  );
}

export default ListaProdutos;