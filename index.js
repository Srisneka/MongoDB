const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const academicRecordSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  grades: [{ subject: String, grade: String }],
});

const coCurricularSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  activityType: String,
  duration: String,
  achievements: String,
});

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularSchema);

const academicRecordsData = [
  {
    studentID: 'S001',
    name: 'John Doe',
    grades: [{ subject: 'Math', grade: 'A' }, { subject: 'Science', grade: 'B' }],
  },
  {
    studentID: 'S002',
    name: 'Alice Smith',
    grades: [{ subject: 'Math', grade: 'B' }, { subject: 'Science', grade: 'A' }],
  },
  {
    studentID: 'S003',
    name: 'Bob Johnson',
    grades: [{ subject: 'Math', grade: 'C' }, { subject: 'Science', grade: 'B' }],
  },
  {
    studentID: 'S004',
    name: 'Emily Davis',
    grades: [{ subject: 'Math', grade: 'A' }, { subject: 'Science', grade: 'A' }],
  },
  {
    studentID: 'S005',
    name: 'Michael Wilson',
    grades: [{ subject: 'Math', grade: 'B' }, { subject: 'Science', grade: 'C' }],
  },
];

const coCurricularData = [
  {
    studentID: 'S001',
    name: 'John Doe',
    activityType: 'Sports',
    duration: '2 years',
    achievements: 'Winner of Inter-school Basketball competition',
  },
  {
    studentID: 'S002',
    name: 'Alice Smith',
    activityType: 'Music',
    duration: '3 years',
    achievements: 'Piano Grade 5',
  },
  {
    studentID: 'S003',
    name: 'Bob Johnson',
    activityType: 'Debate',
    duration: '2 years',
    achievements: 'Best Debater Award',
  },
  {
    studentID: 'S004',
    name: 'Emily Davis',
    activityType: 'Drama',
    duration: '4 years',
    achievements: 'Lead Role in School Play',
  },
  {
    studentID: 'S005',
    name: 'Michael Wilson',
    activityType: 'Sports',
    duration: '3 years',
    achievements: 'Basketball Team Captain',
  },
];

async function populateAdditionalData() {
  try {
    await AcademicRecord.insertMany(additionalAcademicRecords);
    await CoCurricularActivity.insertMany(additionalCoCurricularData);
    console.log('Additional sample data inserted successfully.');
  } catch (err) {
    console.error('Error inserting additional sample data:', err);
  }
}

async function testDatabaseOperations() {
  try {
    
    const academicRecords = await AcademicRecord.find();
    console.log('Academic Records:', academicRecords);

    const coCurricularActivities = await CoCurricularActivity.find();
    console.log('Co-curricular Activities:', coCurricularActivities);

    await AcademicRecord.updateOne({ studentID: 'S001' }, { $set: { name: 'Jane Doe' } });
    console.log('Updated Academic Record:');

    const updatedAcademicRecord = await AcademicRecord.findOne({ studentID: 'S001' });
    console.log(updatedAcademicRecord);

    await CoCurricularActivity.deleteMany({ studentID: 'S001' });
    console.log('Deleted Co-curricular Activities for student ID: S001');

    const remainingActivities = await CoCurricularActivity.find({ studentID: 'S001' });
    console.log('Remaining Co-curricular Activities:', remainingActivities);
  } catch (err) {
    console.error('Error performing database operations:', err);
  }
}
populateAdditionalData().then(testDatabaseOperations);
