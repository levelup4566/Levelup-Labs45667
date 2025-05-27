
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Clock, Users, Calendar, PlayCircle, BookOpen } from 'lucide-react';

const DesignCourse = () => {
  const navigate = useNavigate();

  const modules = [
    { id: 1, title: 'Design Principles', duration: '2 hours', completed: false },
    { id: 2, title: 'Color Theory', duration: '1.5 hours', completed: false },
    { id: 3, title: 'Typography', duration: '2 hours', completed: false },
    { id: 4, title: 'UI/UX Fundamentals', duration: '3 hours', completed: false },
    { id: 5, title: 'Design Tools', duration: '2.5 hours', completed: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouterHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white mb-8">
          <div className="container px-4 py-6 max-w-6xl">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">UI/UX Design Essentials</h1>
            <p className="text-lg text-white/90 mb-4">Learn the fundamentals of user interface and user experience design</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-semibold">
                <Clock className="mr-1 h-4 w-4" />
                11 hours total
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-semibold">
                <Users className="mr-1 h-4 w-4" />
                1,823 enrolled
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-semibold">
                <Calendar className="mr-1 h-4 w-4" />
                Updated recently
              </span>
            </div>
          </div>
        </div>

        <div className="container px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Course Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <PlayCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.duration}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{modules.length}</div>
                        <div className="text-sm text-muted-foreground">Total Modules</div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => navigate('/course-dashboard')}>
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DesignCourse;
