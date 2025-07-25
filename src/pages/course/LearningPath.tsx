import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Award, 
  Star, 
  BookOpen, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Target,
  TrendingUp,
  DollarSign,
  Calendar,
  Briefcase,
  Code2,
  Palette,
  Brain,
  Gamepad2,
  Video,
  Heart
} from 'lucide-react';

// Learning path data based on onboarding selections
const learningPaths = {
  coding: {
    title: 'Web Development',
    subtitle: 'Full-Stack Developer Learning Path',
    description: 'Master modern web development from frontend to backend, building real-world applications',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    totalDuration: '180h',
    estimatedTime: '6-8 Months',
    averageSalary: '$85,000',
    sections: [
      {
        title: 'Frontend Fundamentals',
        color: 'purple',
        courses: [
          {
            title: 'HTML & CSS Mastery',
            duration: '12h 30m',
            level: 'Beginner',
            topics: ['HTML5 Semantics', 'CSS Grid & Flexbox', 'Responsive Design', 'CSS Animations'],
            completed: false
          },
          {
            title: 'JavaScript Essentials',
            duration: '18h 45m',
            level: 'Beginner',
            topics: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'APIs'],
            completed: false
          }
        ]
      },
      {
        title: 'Modern Frontend Frameworks',
        color: 'blue',
        courses: [
          {
            title: 'React.js Complete Guide',
            duration: '25h 15m',
            level: 'Intermediate',
            topics: ['Components & Hooks', 'State Management', 'Routing', 'Testing'],
            completed: false,
            recommended: true
          },
          {
            title: 'TypeScript for React',
            duration: '8h 30m',
            level: 'Intermediate',
            topics: ['Type Safety', 'Interfaces', 'Generics', 'Advanced Types'],
            completed: false
          }
        ]
      },
      {
        title: 'Backend Development',
        color: 'green',
        courses: [
          {
            title: 'Node.js & Express',
            duration: '20h 0m',
            level: 'Intermediate',
            topics: ['Server Setup', 'REST APIs', 'Authentication', 'Database Integration'],
            completed: false
          },
          {
            title: 'Database Design & SQL',
            duration: '15h 45m',
            level: 'Beginner',
            topics: ['Relational Databases', 'SQL Queries', 'Database Optimization', 'NoSQL Basics'],
            completed: false
          }
        ]
      }
    ]
  },
  design: {
    title: 'UI/UX Design',
    subtitle: 'Digital Designer Learning Path',
    description: 'Create beautiful and intuitive user experiences through design thinking and modern tools',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    totalDuration: '120h',
    estimatedTime: '4-6 Months',
    averageSalary: '$75,000',
    sections: [
      {
        title: 'Design Fundamentals',
        color: 'pink',
        courses: [
          {
            title: 'Design Principles & Theory',
            duration: '10h 30m',
            level: 'Beginner',
            topics: ['Color Theory', 'Typography', 'Layout & Composition', 'Visual Hierarchy'],
            completed: false
          },
          {
            title: 'User Experience Design',
            duration: '15h 45m',
            level: 'Beginner',
            topics: ['User Research', 'Personas', 'User Journey Mapping', 'Wireframing'],
            completed: false
          }
        ]
      },
      {
        title: 'Design Tools Mastery',
        color: 'purple',
        courses: [
          {
            title: 'Figma Complete Course',
            duration: '12h 15m',
            level: 'Beginner',
            topics: ['Interface Design', 'Prototyping', 'Component Systems', 'Collaboration'],
            completed: false,
            recommended: true
          },
          {
            title: 'Adobe Creative Suite',
            duration: '18h 30m',
            level: 'Intermediate',
            topics: ['Photoshop', 'Illustrator', 'After Effects', 'InDesign'],
            completed: false
          }
        ]
      }
    ]
  },
  data: {
    title: 'Data Science & AI',
    subtitle: 'Data Scientist Learning Path',
    description: 'Extract insights from data and build intelligent systems using machine learning',
    icon: Brain,
    gradient: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    totalDuration: '200h',
    estimatedTime: '8-10 Months',
    averageSalary: '$110,000',
    sections: [
      {
        title: 'Data Science Foundations',
        color: 'indigo',
        courses: [
          {
            title: 'Python for Data Science',
            duration: '20h 30m',
            level: 'Beginner',
            topics: ['Pandas', 'NumPy', 'Data Manipulation', 'Visualization'],
            completed: false
          },
          {
            title: 'Statistics & Probability',
            duration: '15h 45m',
            level: 'Beginner',
            topics: ['Descriptive Statistics', 'Probability Theory', 'Hypothesis Testing', 'Regression'],
            completed: false
          }
        ]
      },
      {
        title: 'Machine Learning',
        color: 'purple',
        courses: [
          {
            title: 'Machine Learning Fundamentals',
            duration: '25h 15m',
            level: 'Intermediate',
            topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
            completed: false,
            recommended: true
          },
          {
            title: 'Deep Learning with TensorFlow',
            duration: '30h 30m',
            level: 'Advanced',
            topics: ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning'],
            completed: false
          }
        ]
      }
    ]
  }
};

const LearningPath = () => {
  const { goalId, timeId, experienceId } = useParams();
  const [selectedTime, setSelectedTime] = useState('2');
  
  const pathData = learningPaths[goalId as keyof typeof learningPaths];
  
  if (!pathData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Learning Path Not Found</h1>
          <p className="text-slate-600">The requested learning path doesn't exist.</p>
        </div>
      </div>
    );
  }

  const Icon = pathData.icon;
  const totalCourses = pathData.sections.reduce((acc, section) => acc + section.courses.length, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-200 text-slate-700 text-sm font-semibold mb-6">
            <Icon className="w-4 h-4 mr-2 text-blue-500" />
            Learning Path
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r ${pathData.gradient} bg-clip-text text-transparent`}>
            {pathData.title}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {pathData.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-5 h-5" />
              <span>{pathData.totalDuration}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen className="w-5 h-5" />
              <span>{totalCourses} Courses</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Award className="w-5 h-5" />
              <span>Certificate</span>
            </div>
          </div>

          <Button size="lg" className={`bg-gradient-to-r ${pathData.gradient} hover:opacity-90 text-white px-8 py-3 text-lg`}>
            <Play className="w-5 h-5 mr-2" />
            Start Learning Path
          </Button>
        </div>
      </section>

      {/* Learning Path Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Learning Journey</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Follow this structured path to master {pathData.title.toLowerCase()} step by step
            </p>
          </div>

          <div className="space-y-12">
            {pathData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative">
                {/* Section Header */}
                <div className="flex items-center mb-6">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                    ${section.color === 'purple' ? 'bg-purple-500' : 
                      section.color === 'blue' ? 'bg-blue-500' :
                      section.color === 'green' ? 'bg-green-500' :
                      section.color === 'pink' ? 'bg-pink-500' :
                      section.color === 'indigo' ? 'bg-indigo-500' : 'bg-gray-500'}
                  `}>
                    {sectionIndex + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                    <p className="text-slate-600">{section.courses.length} courses in this section</p>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-16">
                  {section.courses.map((course, courseIndex) => (
                    <Card key={courseIndex} className="hover:shadow-lg transition-shadow duration-300 border border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg font-semibold text-slate-900">
                                {course.title}
                              </CardTitle>
                              {course.recommended && (
                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </div>
                              <Badge variant="outline" className={`
                                ${course.level === 'Beginner' ? 'border-green-200 text-green-700' :
                                  course.level === 'Intermediate' ? 'border-blue-200 text-blue-700' :
                                  'border-red-200 text-red-700'}
                              `}>
                                {course.level}
                              </Badge>
                            </div>
                          </div>
                          <CheckCircle className={`w-6 h-6 ${course.completed ? 'text-green-500' : 'text-slate-300'}`} />
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full hover:bg-slate-50"
                          disabled={course.completed}
                        >
                          {course.completed ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Course
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Connecting Line */}
                {sectionIndex < pathData.sections.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-16 bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time Estimation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How Long Will This Take?</h2>
          
          <Tabs value={selectedTime} onValueChange={setSelectedTime} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
              <TabsTrigger value="1">1h/day</TabsTrigger>
              <TabsTrigger value="2">2h/day</TabsTrigger>
              <TabsTrigger value="4">4h/day</TabsTrigger>
              <TabsTrigger value="8">8h/day</TabsTrigger>
            </TabsList>
            
            <TabsContent value="1" className="space-y-4">
              <div className="text-4xl font-bold text-slate-900">≈ 6 Months</div>
              <p className="text-slate-600">Perfect for learning alongside your current commitments</p>
            </TabsContent>
            
            <TabsContent value="2" className="space-y-4">
              <div className="text-4xl font-bold text-slate-900">≈ {pathData.estimatedTime}</div>
              <p className="text-slate-600">Ideal pace for consistent progress and retention</p>
            </TabsContent>
            
            <TabsContent value="4" className="space-y-4">
              <div className="text-4xl font-bold text-slate-900">≈ 2 Months</div>
              <p className="text-slate-600">Accelerated learning for dedicated students</p>
            </TabsContent>
            
            <TabsContent value="8" className="space-y-4">
              <div className="text-4xl font-bold text-slate-900">≈ 1 Month</div>
              <p className="text-slate-600">Intensive bootcamp-style learning</p>
            </TabsContent>
          </Tabs>
          
          <p className="text-sm text-slate-500 mt-6">
            * This is based on averages from our students and may vary depending on your prior experience
          </p>
        </div>
      </section>

      {/* Career Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What You'll Do */}
            <Card className="p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-blue-500" />
                  What You'll Do Daily
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {goalId === 'coding' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Build responsive web applications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Write clean, maintainable code</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Collaborate with design teams</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Deploy and maintain applications</span>
                      </div>
                    </>
                  )}
                  {goalId === 'design' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Design user interfaces and experiences</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Conduct user research and testing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Create design systems and prototypes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Collaborate with development teams</span>
                      </div>
                    </>
                  )}
                  {goalId === 'data' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Analyze large datasets for insights</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Build machine learning models</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Create data visualizations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Present findings to stakeholders</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Salary Information */}
            <Card className="p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-green-500" />
                  Career Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">{pathData.averageSalary}</div>
                  <div className="text-slate-600">Average Salary</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Entry Level</span>
                    <span className="font-semibold">$45,000 - $65,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Mid Level</span>
                    <span className="font-semibold">$65,000 - $95,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Senior Level</span>
                    <span className="font-semibold">$95,000 - $150,000+</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>15% job growth expected over next 10 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${pathData.gradient}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have transformed their careers with our learning paths
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
              <Play className="w-5 h-5 mr-2" />
              Start Free Course
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Calendar className="w-5 h-5 mr-2" />
              View Full Curriculum
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPath;
