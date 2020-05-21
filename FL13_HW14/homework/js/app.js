function Student(name, email) {
   const _name = name;
   const _email = email;
   const _homeworkResults = [];

   this.getName = () => {
      return _name;
   };
   this.getEmail = () => {
      return _email;
   };
   this.addHomeworkResult = (topic, success) => {
      _homeworkResults.push({
         topic: topic,
         success: success
      });
   };
   this.getHomeworkResults = () => {
      return _homeworkResults;
   };
}

function FrontendLab(studentsList, faildLimit) {
   const _studentsList = studentsList;
   const _faildLimit = faildLimit;
   let counter = 10;

   this.addHomeworkResults = (homeworkResult) => {
      for(let student of _studentsList) {
         if(counter === 10) {
            student.result = [];
         }         
         for(let key in homeworkResult) {
            if(key === 'results') {
               const studentMatch = homeworkResult[key].find(item => item.email === student.email);
               student.result.push(Object.create(null, {
                  topic: {
                     value: homeworkResult.topic
                  }, 
                  success: {
                     value: studentMatch.success
                  }
               }));
            }
         }
      }
      counter--;
   };
   this.printStudentsList = () => {
      for(let studentObj of _studentsList) {
         console.log(`name: ${studentObj.name}, email: ${studentObj.email}`);
         console.log(studentObj.result);
      }   
   };
   this.printStudentsEligibleForTest = () => {
      let fails;
      for(let student of _studentsList) {
         fails = 0;
         for(let key in student) {
            if(key === 'result') {
               for(let item of student[key]) {
                  if(!item.success) {
                     fails++;
                  }
               }
            }
            
         }
         if(fails < _faildLimit) {
            console.log(`name: ${student.name}, email: ${student.email}`);
         }
      }
      
   };
}