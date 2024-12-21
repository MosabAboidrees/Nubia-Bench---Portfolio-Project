import React, { useState } from 'react';
import { Task } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Plus, Trash2 } from 'lucide-react';

interface TaskFormProps {
  task?: Partial<Task>;
  onSubmit: (taskData: Partial<Task>) => void;
  onCancel: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: task?.title || '',
    description: task?.description || '',
    type: task?.type || 'coding',
    content: task?.content || '',
    solution: task?.solution || '',
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === 'quiz') {
      // Format quiz questions into content string
      const content = JSON.stringify(quizQuestions);
      onSubmit({ ...formData, content });
    } else {
      onSubmit(formData);
    }
  };

  const addQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...quizQuestions];
    if (field === 'options') {
      const [optionIndex, optionValue] = value;
      updatedQuestions[index].options[optionIndex] = optionValue;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuizQuestions(updatedQuestions);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              required
              placeholder="Enter task title..."
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              required
              placeholder="Provide a clear description of the task..."
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Task Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as Task['type'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="coding">Coding Task</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          {formData.type === 'coding' ? (
            <>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Task Content
                </label>
                <textarea
                  id="content"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono"
                  placeholder="// Add your coding task instructions here"
                  required
                />
              </div>

              <div>
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                  Solution (Optional)
                </label>
                <textarea
                  id="solution"
                  rows={6}
                  value={formData.solution}
                  onChange={(e) => setFormData((prev) => ({ ...prev, solution: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm font-mono"
                  placeholder="// Add the solution code here"
                />
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {quizQuestions.map((question, questionIndex) => (
                <div key={questionIndex} className="p-4 bg-white rounded-lg border border-primary-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Question {questionIndex + 1}</h3>
                    {quizQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        placeholder="Enter your question"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            required
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateQuestion(questionIndex, 'options', [optionIndex, e.target.value])}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder={`Option ${optionIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center px-4 py-2 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </button>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}