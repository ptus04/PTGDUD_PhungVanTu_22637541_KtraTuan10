import React, { useState } from 'react';
import './index.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', class: '10A', age: 20 },
    { id: 2, name: 'Bob', class: '11B', age: 22 },
    { id: 3, name: 'Charlie', class: '12C', age: 19 },
  ]);

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Table</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Tên</th>
            <th className="border border-gray-300 px-4 py-2">Lớp</th>
            <th className="border border-gray-300 px-4 py-2">Tuổi</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.class}</td>
              <td className="border border-gray-300 px-4 py-2">{student.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(student.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
