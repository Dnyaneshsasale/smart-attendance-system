import { useState, useEffect } from 'react';
import API from './api/axios';

function App() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [students, setStudents] = useState([]); 
  const [attendanceRecords, setAttendanceRecords] = useState([]); // NEW: For history
  const [message, setMessage] = useState('');

  // Fetch both students and the history
  const fetchData = async () => {
    try {
      const studentRes = await API.get('/students');
      setStudents(studentRes.data);
      
      const attendanceRes = await API.get('/attendance');
      setAttendanceRecords(attendanceRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/students', { name, rollNumber });
      setMessage(response.data.message);
      setName('');
      setRollNumber('');
      fetchData(); 
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.error || "Error"));
    }
  };

  const markAttendance = async (studentId, status) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      await API.post('/attendance', { studentId, date: today, status });
      alert(`Marked ${status} for today!`);
      fetchData(); // Refresh history table immediately
    } catch (error) {
      alert("Error marking attendance");
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', textAlign: 'center', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#646cff' }}>Smart Attendance System</h1>
      
      {/* SECTION 1: ADD STUDENT */}
      <div style={{ marginBottom: '30px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'inline-block' }}>
        <h3>1. Add New Student</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required style={{padding: '5px'}}/>
          <input type="text" placeholder="Roll No" value={rollNumber} onChange={(e)=>setRollNumber(e.target.value)} required style={{padding: '5px'}}/>
          <button type="submit" style={{cursor: 'pointer'}}>Add Student</button>
        </form>
        {message && <p style={{color: 'green'}}>{message}</p>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* SECTION 2: MARK ATTENDANCE */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', flex: '1', minWidth: '300px' }}>
          <h3>2. Mark Attendance (Today)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#eee' }}>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{s.name} ({s.rollNumber})</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    <button onClick={() => markAttendance(s._id, 'Present')} style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>P</button>
                    <button onClick={() => markAttendance(s._id, 'Absent')} style={{ backgroundColor: 'red', color: 'white' }}>A</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION 3: ATTENDANCE HISTORY */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', flex: '1', minWidth: '300px' }}>
          <h3>3. Attendance History</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#eee' }}>
                <th>Date</th>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{record.date}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{record.studentId?.name || 'Deleted Student'}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: record.status === 'Present' ? 'green' : 'red', fontWeight: 'bold' }}>
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;