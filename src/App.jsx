import React, { useState, useEffect } from 'react';
import './index.css';
import StudentItem from './StudentItem';

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [
      { id: 1, name: 'Alice', class: '10A', age: 20 },
      { id: 2, name: 'Bob', class: '11B', age: 22 },
      { id: 3, name: 'Charlie', class: '12C', age: 19 },
      { id: 4, name: 'David', class: '10D', age: 21 },
      { id: 5, name: 'Eve', class: '11E', age: 23 },
      { id: 6, name: 'Frank', class: '10A', age: 18 },
      { id: 7, name: 'Grace', class: '11B', age: 20 },
      { id: 8, name: 'Hannah', class: '12C', age: 22 },
      { id: 9, name: 'Ian', class: '10D', age: 19 },
      { id: 10, name: 'Jack', class: '11E', age: 21 },
    ];
  });

  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [classFilter, setClassFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

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

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleSaveEdit = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      )
    );
    setEditingStudent(null);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    student.class.toLowerCase().includes(classFilter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Student Management</h1>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Classes</option>
          {[...new Set(students.map((student) => student.class))].map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class"
            value={newStudent.class}
            onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Student
          </button>
        </div>
      </div>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Class</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onEdit={handleEditStudent}
            />
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <div className="fixed inset-0 bg-gray-800/35 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Edit Student</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingStudent.name}
              onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Class"
              value={editingStudent.class}
              onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Age"
              value={editingStudent.age}
              onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
              <button
                onClick={() => setEditingStudent(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
