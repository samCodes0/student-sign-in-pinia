import {defineStore} from "pinia";
import {ref, computed} from 'vue';

// this is where we define the stores as export variables. We can import these into our different components
// to access their data

// this is the store containing data about the students in our program, as well as functionality add and delete
// students
export const useStudentStore = defineStore('students', () => {
    const studentList = ref([
        {name: 'A. Student', starID: 'aa1234aa', present: false},
        {name: 'B. Student', starID: 'bb1234bb', present: false},
    ]);

    // the most recent student that was either added or removed from the class
    const mostRecentStudent = ref({});

    function addNewStudent(student) {
        studentList.value.push(student);
    }

    function deleteStudent(studentToDelete) {
        studentList.value = studentList.value.filter((student) => {
            return studentToDelete != student;
        })
        mostRecentStudent.value = {}; // resetting most recent student
    }

    function arrivedOrLeft(student) {
        mostRecentStudent.value = student;
    }

    const studentCount = computed(() => {
        return studentList.value.length;
    })

    const sortedStudents = computed(() => {
        return studentList.value.toSorted((s1, s2) => {
            return s1.name.localeCompare(s2.name);
        })
    })

    // returning the data we want to use from this component here
    return {
        studentList,
        mostRecentStudent,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        studentCount,
        sortedStudents
    }
})