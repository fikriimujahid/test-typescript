import { StudentScore } from "../models/input";
import { StudentScoreMetrics } from "../models/output";

export function findMedianStudentScore(studentScores: StudentScore[]) {
  let middle = Math.floor(studentScores.length / 2);
  let sortedScores = studentScores.sort((a: StudentScore, b: StudentScore) => (a.score < b.score) ? -1 : 1);
  
  return studentScores.length % 2 !== 0 ? sortedScores[middle].score : (sortedScores[middle - 1].score + sortedScores[middle].score) / 2;
}

export function findMedianStudentScoreMetrics(studentScores: StudentScoreMetrics[]) {
  let middle = Math.floor(studentScores.length / 2);
  let sortedScores = studentScores.sort((a: StudentScoreMetrics, b: StudentScoreMetrics) => (a.totalScore < b.totalScore) ? -1 : 1);
  
  return studentScores.length % 2 !== 0 ? sortedScores[middle].totalScore : (sortedScores[middle - 1].totalScore + sortedScores[middle].totalScore) / 2;
}

export function findMedianWeightedPercentage(studentScores: StudentScoreMetrics[]) {
  let middle = Math.floor(studentScores.length / 2);
  let sortedScores = studentScores.sort((a: StudentScoreMetrics, b: StudentScoreMetrics) => (a.weightedPercentage < b.weightedPercentage) ? -1 : 1);
  
  return studentScores.length % 2 !== 0 ? sortedScores[middle].weightedPercentage : (sortedScores[middle - 1].weightedPercentage + sortedScores[middle].weightedPercentage) / 2;
}