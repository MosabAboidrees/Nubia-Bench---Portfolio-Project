import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function TaskView() {
  const { courseId, taskId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const course = useCourseStore(state => state.getCourse(courseId!));
  const task = course?.tasks.find(t => t.id === taskId);
  const isTeacher = user?.role === 'teacher';
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  if (!course || !task) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Not Found</h1>
        <p className="text-gray-600">The task you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="text-primary-600 hover:text-primary-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Return to Course
        </button>
      </div>
    );
  }

  const userSubmission = task.submissions?.find(
    sub => sub.studentId === user?.id
  );

  let quizQuestions: QuizQuestion[] = [];
  if (task.type === 'quiz') {
    try {
      quizQuestions = JSON.parse(task.content);
    } catch (e) {
      console.error('Failed to parse quiz questions:', e);
    }
  }

  const handleSubmitSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      let content: string;

      if (task.type === 'quiz') {
        content = JSON.stringify(selectedAnswers);
      } else {
        content = formData.get('solution') as string;
      }

      const updatedTasks = course.tasks.map(t => {
        if (t.id === taskId) {
          const submissions = t.submissions || [];
          const existingSubmissionIndex = submissions.findIndex(
            sub => sub.studentId === user.id
          );

          const newSubmission = {
            id: crypto.randomUUID(),
            studentId: user.id,
            content,
            status: 'completed',
            submittedAt: new Date(),
          };

          if (existingSubmissionIndex >= 0) {
            submissions[existingSubmissionIndex] = newSubmission;
          } else {
            submissions.push(newSubmission);
          }

          return {
            ...t,
            submissions,
          };
        }
        return t;
      });

      useCourseStore.getState().updateCourse(courseId!, { tasks: updatedTasks });
      navigate(`/course/${courseId}`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuizContent = () => {
    if (!quizQuestions.length) return null;

    const previousAnswers = userSubmission?.content 
      ? JSON.parse(userSubmission.content) 
      : [];

    return (
      <div className="space-y-6">
        {quizQuestions.map((question, index) => (
          <div key={index} className="p-4 bg-white rounded-md border border-primary-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {index + 1}. {question.question}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[index] === optionIndex || previousAnswers[index] === optionIndex;
                const isCorrect = question.correctAnswer === optionIndex;
                const showFeedback = userSubmission && (isSelected || isCorrect);
                
                let optionClassName = "flex items-center space-x-3 p-3 rounded-md transition-colors";
                if (showFeedback) {
                  if (isCorrect) {
                    optionClassName += " bg-green-50 border border-green-200";
                  } else if (isSelected && !isCorrect) {
                    optionClassName += " bg-red-50 border border-red-200";
                  }
                } else {
                  optionClassName += " hover:bg-sand-50";
                }

                return (
                  <label key={optionIndex} className={optionClassName}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      checked={isSelected}
                      onChange={() => {
                        const newAnswers = [...selectedAnswers];
                        newAnswers[index] = optionIndex;
                        setSelectedAnswers(newAnswers);
                      }}
                      disabled={!!userSubmission}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className={`text-gray-700 ${showFeedback && isCorrect ? 'font-medium' : ''}`}>
                      {option}
                    </span>
                    {showFeedback && (
                      <span className="ml-auto">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          isSelected && <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {userSubmission && (
              <div className="mt-4 text-sm">
                {previousAnswers[index] === question.correctAnswer ? (
                  <p className="text-green-600">Correct answer!</p>
                ) : (
                  <p className="text-red-600">
                    Incorrect. The correct answer was: {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Course
        </button>
        {!isTeacher && userSubmission && (
          <div className="flex items-center text-primary-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Task Completed</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
        
        <Card>
          <CardContent>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{task.description}</p>
          </CardContent>
        </Card>

        {task.type === 'coding' ? (
          <>
            <Card>
              <CardContent>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Instructions</h2>
                <div className="mt-2 p-4 bg-white rounded-md border border-primary-100">
                  <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                    <code>{task.content}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {isTeacher && task.solution && (
              <Card>
                <CardContent>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Solution</h2>
                  <div className="mt-2 p-4 bg-white rounded-md border border-primary-100">
                    <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                      <code>{task.solution}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isTeacher && (
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Submit Your Solution</h2>
                    {userSubmission && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Previously Submitted
                      </span>
                    )}
                  </div>
                  <form onSubmit={handleSubmitSolution}>
                    <div className="p-4 bg-white rounded-md border border-primary-100">
                      <textarea
                        name="solution"
                        rows={8}
                        className="w-full font-mono text-sm border-0 focus:ring-0 p-0 bg-transparent resize-none"
                        placeholder="Enter your solution here..."
                        defaultValue={userSubmission?.content}
                        required
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            {userSubmission ? 'Update Solution' : 'Submit Solution'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmitSolution}>
                {renderQuizContent()}
                {!isTeacher && !userSubmission && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting || selectedAnswers.length !== quizQuestions.length}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Answers'
                      )}
                    </button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}