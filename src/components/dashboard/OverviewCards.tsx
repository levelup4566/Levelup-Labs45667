
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressCircle from '@/components/ui/ProgressCircle';
import { TrendingUp, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useLearningStreak } from '@/hooks/useLearningStreak';

type Achievement = {
  name: string;
  date: string;
  icon: React.ReactNode;
};

interface OverviewCardsProps {
  achievements: Achievement[];
}

const OverviewCards = ({ achievements }: OverviewCardsProps) => {
  const { userStats } = useUserData();
  const { streak } = useLearningStreak();

  const overallProgress = userStats ? Math.min((userStats.experience_points / 100) * 10, 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Overall Progress Card */}
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Overall Progress
          </CardTitle>
          <CardDescription>Level {userStats?.current_level || 1} - {userStats?.total_skill_points || 0} points</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pt-4">
          <ProgressCircle value={overallProgress} size={160} animate={true} />
        </CardContent>
      </Card>
      
      {/* Streak Card */}
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            Learning Streak
          </CardTitle>
          <CardDescription>Stay consistent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{streak?.current_streak || 0} days</div>
              <div className="text-muted-foreground text-sm">Current streak</div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <div 
                key={day} 
                className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                  day <= (streak?.current_streak || 0) ? 'bg-green-100 text-green-600' : 'bg-secondary text-muted-foreground'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements Card */}
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.length > 0 ? achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-secondary/50">
                <div className="bg-secondary p-2 rounded-full">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-muted-foreground text-xs">{achievement.date}</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No achievements yet</p>
                <p className="text-xs">Complete lessons to earn your first badge!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
