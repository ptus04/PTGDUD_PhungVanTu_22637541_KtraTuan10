import React, { useState } from 'react';
import './index.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', class: '10A', age: 20 },
    { id: 2, name: 'Bob', class: '11B', age: 22 },
    { id: 3, name: 'Charlie', class: '12C', age: 19 },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class && newStudent.age) {
      setStudents((prevStudents) => [
        ...prevStudents,
        { id: Date.now(), name: newStudent.name, class: newStudent.class, age: parseInt(newStudent.age, 10) },
      ]);
      setNewStudent({ name: '', class: '', age: '' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Table</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Họ tên"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border border-gray-300 px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          className="border border-gray-300 px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          className="border border-gray-300 px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>
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
