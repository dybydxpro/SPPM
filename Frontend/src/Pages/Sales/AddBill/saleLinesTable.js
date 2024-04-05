import React from 'react';

const SaleLinesTable = ({ saleLines }) => {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">Product ID</th>
          <th scope="col">Product Name</th>
          <th scope="col">Batch No</th>
          <th scope="col">Quantity</th>
          <th scope="col">Selling Price</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {saleLines.map((saleLine, index) => (
          <tr key={index}>
            <td>{saleLine.productId}</td>
            <td>{saleLine.productName}</td>
            <td>{saleLine.batchNo}</td>
            <td>{saleLine.quantity}</td>
            <td>{saleLine.sellingPrice}</td>
            <td>{saleLine.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SaleLinesTable;
