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
  const finalResult = [];
  //********* console.log(groupLearner2assignments(submissions, ag)); ******** 

  //result = groupLearner2assignments(submissions, ag)
  try {
    // Validate that assignment groups match the course 
    if (ag.course_id !== course.id) 
      { throw new Error(`Invalid data: Assignment group ${ag.id} does not belong to course ${course.id}.`); }


    //*** Function to collect necessary learners assignment info for processing */
   // function groupLearner2assignments(submissions) {
      const learnerKey = [];
      const learnerAssignments = [];
      const learnerSubmission = [];

      // collect and store learner keys in array learnKey []
      submissions.forEach(learner => {
        learnerKey.push({ id: learner.learner_id });
      });

      // collect and store each assignment info for processing 
      submissions.forEach(assignment => {
        learnerAssignments.push({
          learnerID: assignment.learner_id, a_Sub: {
            assign_ID: assignment.assignment_id,
            score: assignment.submission.score, submittedAt: assignment.submission.submitted_at
          }
        });
      });

      const calcs = {} //object to store learners assignment results
      const assignmentInfo = ag.assignments

      //calculate and store learners results 
      for (let x = 0; x < learnerKey.length; x++) {
        // verify that learner key matches with id in assignments record
        if (learnerKey.id === learnerAssignments.learnerID) {
          learnerSubmission.push(learnerAssignments[x]);
        } else if (learnerKey.id !== learnerAssignments.learnerID) {
          break;
        }

        const currentDate = new Date();

        let points = 0;   // percentage for each learner assignment
        let score = 0;    // local variable to use when or if learner score needs to be updated

        // loop through assignment info array to match learners 
        // with their assignments to calculate their points
        for (let y = 0; y < assignmentInfo.length; y++) {
  
          if (currentDate < new Date(assignmentInfo[y].due_at)) {
            continue;
          }
          if (assignmentInfo[y].id === learnerSubmission[x].a_Sub.assign_ID) {
            //check if assignment submitted is late
            const isLate = new Date(assignmentInfo[y].due_at) < new Date(learnerSubmission[x].a_Sub.submittedAt)

            if (isLate) {
              // calculate new score by applying 10% deduction penalty to the score
              //then calculate the percentage of the assignment
              score = (learnerSubmission[x].a_Sub.score - (assignmentInfo[y].points_possible * .1))
              points = parseFloat((score / assignmentInfo[y].points_possible).toFixed(3));
            }
            else {
              // calculate learners assignment percentage
              score = (learnerSubmission[x].a_Sub.score)
              points = parseFloat((score / assignmentInfo[y].points_possible).toFixed(3));
            }

            // store learner assignment information for more processing later
            if (learnerSubmission[x].learnerID === learnerSubmission[x].learnerID)
              calcs[x] = {
                id: learnerSubmission[x].learnerID, assignmentmentID: learnerSubmission[x].a_Sub.assign_ID, points,
                score: score, pp: assignmentInfo[y].points_possible
              };
          }
        }
      }


      const subResults = Object.values(calcs) //set to get values of the object
      //Group learners by id and calculate the avg for each learner
      for (let x = 0; x < subResults.length - 1; x++) {
        //const LearnerResult = {}
        const current = subResults[x];
        const next = subResults[x + 1];

        let avg = 0;

        /* if (!LearnerResult[x]) {
          LearnerResult[x] = []; // Create the array if it doesn't exist
        } */

        if (current.id === next.id) {
          const currentPoint = current.points;
          const nextPoint = next.points;
          avg = (current.score + next.score) / (current.pp + next.pp)
          finalResult.push(`{id: ${current.id}, avg: ${avg}, ${current.assignmentmentID}: ${currentPoint}, ${next.assignmentmentID}: ${nextPoint}}`);
          //LearnerResult[x] = `{id: ${current.id}, avg: ${avg}, ${current.assignmentmentID}: ${currentPoint}, ${next.assignmentmentID}: ${nextPoint}}`;

        }
        else {
          // to prevent from creating an empty array
          continue;
        }
        // return finalResult
        //console.log(finalResult)
      }
   // }

  }
  catch (error) {
    console.log("Error 308: Please verify that you all processing data are valid:)", error);
  }
  return finalResult;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);



