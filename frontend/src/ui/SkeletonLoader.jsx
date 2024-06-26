import React from 'react';

const SkeletonLoader = ({ rows = 5, columns }) => {
  return (
    <tbody className="animate-pulse bg-white table-row-group w-full">
      {Array(rows).fill().map((_, rowIndex) => (
        <tr key={rowIndex} className="border table-row">
          {columns?.map((col, colIndex) => (
            <td key={colIndex} className="p-2 bg-gray-200 rounded table-cell">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonLoader;
