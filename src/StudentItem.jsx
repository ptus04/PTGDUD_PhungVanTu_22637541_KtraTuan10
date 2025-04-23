import React from 'react';

function StudentItem({ student, onDelete, onEdit }) {
  return (
    <tr className="text-center">
      <td className="border border-gray-300 px-4 py-2">{student.name}</td>
      <td className="border border-gray-300 px-4 py-2">{student.class}</td>
      <td className="border border-gray-300 px-4 py-2">{student.age}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
          onClick={() => onDelete(student.id)}
        >
          Xóa
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
          onClick={() => onEdit(student)}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;