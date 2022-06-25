import { findMedianStudentScore, findMedianWeightedPercentage } from './helpers/misc';
import { CourseScores } from './models/input';
import { AssignmentScoreMetrics, CourseScoreMetrics, StudentScoreMetrics } from './models/output';

export function getCourseScoreMetrics(input: CourseScores): CourseScoreMetrics {
  /**
   * Set empty template const 
   */
  const assignments: AssignmentScoreMetrics[] = [];
  const unSortedStudentScores: StudentScoreMetrics[] = [];
  let perAssignmentMedianWeightedPercentage = 0;

   /**
   * foreach assignment scores
   */
  input.assignmentScores.forEach(function (AssignmentScore,index) {
    /**
     * Store assignment to temp const with inline calculatin 
     */
    const assignment : AssignmentScoreMetrics = {
      assignmentName: AssignmentScore.assignmentName,
      maxScore: Math.max.apply(Math, AssignmentScore.studentScores.map(function(o){return o.score})),
      minScore: Math.min.apply(Math, AssignmentScore.studentScores.map(function(o){return o.score})),
      meanScore: AssignmentScore.studentScores.reduce((sum, {score}) =>  sum + score, 0) / AssignmentScore.studentScores.length,
      medianScore: findMedianStudentScore(AssignmentScore.studentScores)
    };
    /**
    * sum per assignment median weighted while the data still loop
    */
    perAssignmentMedianWeightedPercentage += ((assignment.medianScore / AssignmentScore.maxPossibleScore) * AssignmentScore.weightInPercent);
    /** 
    * push temp assignment data that already calculate to template assigments const
    */
    assignments.push(assignment);
    
    /** 
    * foreach student score
    */
    AssignmentScore.studentScores.forEach(function (StudentScore,indexStudent) {
      /** 
      * check if student data is exist in template unSortedStudentScores const
      */
      if(unSortedStudentScores.filter(e => e.studentName === StudentScore.studentName).length == 0){
        /** 
        * create temp data and calculate it with inline code
        */
        const sortedStudentScore: StudentScoreMetrics = {
          studentName:  StudentScore.studentName,
          totalScore: StudentScore.score,
          weightedPercentage:((StudentScore.score / AssignmentScore.maxPossibleScore) * AssignmentScore.weightInPercent)
        }
        /** 
        * push temp sortedStudentScore data that already calculate to template unSortedStudentScores const
        */
        unSortedStudentScores.push(sortedStudentScore);
      } else {
        /**
         * find and update existing data
         */
        const currentStudent = unSortedStudentScores.find(i => i.studentName === StudentScore.studentName);
        currentStudent!.totalScore += StudentScore.score;
        currentStudent!.weightedPercentage += ((StudentScore.score / AssignmentScore.maxPossibleScore) * AssignmentScore.weightInPercent);
      }
    });
  });

  /**
   * wrapping data
   */
  const courseScoreMetrics : CourseScoreMetrics = {
    courseName: input.courseName,
    assignments: assignments,
    sortedStudentScores: unSortedStudentScores,
    maxWeightedPercentage: Math.max.apply(Math, unSortedStudentScores.map(function(o){return o.weightedPercentage})),
    minWeightedPercentage: Math.min.apply(Math, unSortedStudentScores.map(function(o){return o.weightedPercentage})),
    meanWeightedPercentage: unSortedStudentScores.reduce((sum, {weightedPercentage}) =>  sum + weightedPercentage, 0) / unSortedStudentScores.length,
    medianWeightedPercentage: findMedianWeightedPercentage(unSortedStudentScores),
    perAssignmentMedianWeightedPercentage:perAssignmentMedianWeightedPercentage
  }
  
  /**
  * Sort student score
  */
  courseScoreMetrics.sortedStudentScores.sort((a,b) => b.totalScore - a.totalScore);

  return courseScoreMetrics;
}
