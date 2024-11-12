// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};


// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};


// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];


function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    /*  {
       id: 125,
       avg: 0.985, // (47 + 150) / (50 + 150)
       1: 0.94, // 47 / 50
       2: 1.0 // 150 / 150
     },
     {
       id: 132,
       avg: 0.82, // (39 + 125) / (50 + 150)
       1: 0.78, // 39 / 50
       2: 0.833 // late: (140 - 15) / 150
     } */
  ];


  console.log(groupLearner2assignments(submissions, ag));


  // array of learners objects with an array of all of each of
  // their assignment submissions objects grouped for each student
  function groupLearner2assignments(submissions) {
    const learnerKey = [];
    const learnerAssignments = [];
    const learnerSubmission = [];


    submissions.forEach(learner => {
      //const learnerID = learner.learner_id;
      learnerKey.push({ id: learner.learner_id });
      //learners.push({ id: learner.learner_id });


      // submissions.forEach(assignment =>{
      //     learnerAssignments.push({assigntment: assignment.assignment_id});
      // });
    });


    submissions.forEach(assignment => {


      learnerAssignments.push({
        learnerID: assignment.learner_id, a_Sub: {
          assign_ID: assignment.assignment_id,
          score: assignment.submission.score, submittedAt: assignment.submission.submitted_at
        }
      });
    });


    //console.log(learnerAssignments)


    const calcs = {}
    const assignmentInfo = ag.assignments
    for (let x = 0; x < learnerKey.length; x++) {
      if (learnerKey.id === learnerAssignments.learnerID) {
        learnerSubmission.push(learnerAssignments[x]);
      } else if (learnerKey.id !== learnerAssignments.learnerID) {
        break;
      }
      const currentDate = new Date();


      let points = 0;
      let score = 0;


      let avg = 0
      for (let y = 0; y < assignmentInfo.length; y++) {
        if (currentDate < new Date(assignmentInfo[y].due_at)) {
          continue;
        }
        if (assignmentInfo[y].id === learnerSubmission[x].a_Sub.assign_ID) {


          const isLate = new Date(assignmentInfo[y].due_at) < new Date(learnerSubmission[x].a_Sub.submittedAt)


          if (isLate) {
            score = (learnerSubmission[x].a_Sub.score - (assignmentInfo[y].points_possible * .1))
            points = parseFloat((score / assignmentInfo[y].points_possible).toFixed(2));
            //totalScore += (learnerSubmission[x].a_Sub.score - (assignmentInfo[y].points_possible * .1))
            // totalPoints += assignmentInfo[y].points_possible
            // avg = parseFloat((totalScore / totalPoints).toFixed(2));
          }
          else {
            score = (learnerSubmission[x].a_Sub.score)
            points = parseFloat((score / assignmentInfo[y].points_possible).toFixed(2));


            // totalScore += (learnerSubmission[x].a_Sub.score)
            // totalPoints += assignmentInfo[y].points_possible
            //avg = parseFloat((totalScore / totalPoints).toFixed(2));
          }


          if (learnerSubmission[x].learnerID === learnerSubmission[x].learnerID)
            calcs[x] = {
              id: learnerSubmission[x].learnerID, assignmentmentID: learnerSubmission[x].a_Sub.assign_ID, points,
              score: score, pp: assignmentInfo[y].points_possible
            };
          //console.log(learnerSubmission[x].learnerID,learnerSubmission[x].a_Sub.assign_ID, points );


        }
      }


    }


    const subResults = Object.values(calcs)
    //console.log(subResults)


    const groupedResults = [];
    /* function sumMatchingKeys(arr) {
        let result = [];
     
        for (let i = 0; i < arr.length - 1; i++) {
          const current = arr[i];
          const next = arr[i + 1];
     
          if (Object.keys(current)[0] === Object.keys(next)[0]) {
            const key = Object.keys(current)[0];
            const sum = current[key] + next[key];
            result.push({ [key]: sum });
            i++; // Skip the next element since we've already processed it
          } else {
            result.push(current);
          }
        }
     
        // Add the last element if it wasn't merged with the previous one
        if (arr.length > 0 && result.length < arr.length) {
          result.push(arr[arr.length - 1]);
        }
     
        return result;
      }
     
      console.log(sumMatchingKeys(subResults));
*/
    for (let x = 0; x < subResults.length - 1; x++) {
      const finalResult = []
      const LearnerResult = {}
      const current = subResults[x];
      const next = subResults[x + 1];


      let avg = 0;


      if (!LearnerResult[x]) {
        LearnerResult[x] = []; // Create the array if it doesn't exist
      }


      if (current.id === next.id) {
        const currentPoint = current.points;
        const nextPoint = next.points;
        const currenttAssign = current.assignmentmentID
        const nextAssign = next.assignmentmentID
        avg = (current.score + next.score) / (current.pp + next.pp)
        finalResult.push(current.id, avg, current.assignmentmentID, currentPoint, next.assignmentmentID, nextPoint);
        LearnerResult[x] = { id: current.id, avg: avg, currenttAssign: currentPoint, nextAssign: nextPoint }
      }
      else {
        continue;
      }

      //console.log(finalResult)
      console.log(LearnerResult)
    }

  }


  return result;
}




const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);


console.log(result);



