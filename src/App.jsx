import React, { useState } from 'react';
import './index.css';

function App() {
  const [students, setStudents] = useState([
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
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [classFilter, setClassFilter] = useState('');

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Table</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-300 px-2 py-1 mr-2"
        />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        >
          <option value="">Tất cả lớp</option>
          {[...new Set(students.map((student) => student.class))].map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div>
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
          {filteredStudents.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.class}</td>
              <td className="border border-gray-300 px-4 py-2">{student.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                  onClick={() => handleDelete(student.id)}
                >
                  Xóa
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                  onClick={() => handleEditStudent(student)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>
            <input
              type="text"
              placeholder="Họ tên"
              value={editingStudent.name}
              onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              className="border border-gray-300 px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Lớp"
              value={editingStudent.class}
              onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
              className="border border-gray-300 px-2 py-1 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Tuổi"
              value={editingStudent.age}
              onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
              className="border border-gray-300 px-2 py-1 mb-2 w-full"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Lưu
            </button>
            <button
              onClick={() => setEditingStudent(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
