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
  const result = [];


  // verify AssignmentGroup course_id mismatch
  if (course.id !== ag.course_id) {
      //console.log("Error: course_ID mismatch. AssignmentGroup does not belong to the course")
      //return;
      throw new Error("Error: course_ID mismatch. AssignmentGroup does not belong to the course");
  }


  // analyze and collect revelant assignment info
  const currentDate = new Date();
  const dueAssignments = [];
  for (const assignment in ag.assignments) {
      //assignment = ag.assignments;
      if (new Date(assignment.due_at) <= currentDate) {
          dueAssignments.push(assignment);
      }
  }


  const arr = [];




  //  Gather LearnerData for processing
  for (const [key, learner] of Object.entries(submissions)) {
      //learners.push(learner);
      //console.log("\n");
      //console.log({id: learner.learner_id});
      console.log({id: learner.learner_id});
     
  }
  // Gather AssignmentInfo for processing
      for (const [key, assignments] of Object.entries(ag.assignments)) {
     
        console.log(assignments) ;

         /*  const isLate = (new Date(assignments.due_at)> new Date(learner.submission.submitted_at));


          if (new Date(assignments.due_at)> new Date(learner.submission.submitted_at)) {
              break;
          }
          console.log(assignments);


          if (learner.assignment_id !== assignments.assignment_id) {
              continue;
             
         
          }else if (assignments.points_possible === 0 || typeof assignments.points_possible !== "number") {
                  throw new Error("Error: points possible cannot be zero or a non-integer")
              }
             //console.log(submittedAt);


              if (isLate) {
                  points = learner.submission.score * 0.9 / assignments.points_possible;
              } else {
                  points = learner.submission.score / assignments.points_possible;
              }
              //console.log(points); */




         










          // console.log(assignments);
          // console.log("\n");
          //console.log({assignment_id: assignments.id});




      }
 
  //return result;
}










const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);


console.log(result);








/* const result = [
{
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
}
]; */





