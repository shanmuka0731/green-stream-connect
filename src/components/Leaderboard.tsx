
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_cash_earned: number;
  total_eco_points: number;
  total_orders: number;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('eco_score_leaderboard')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('total_eco_points', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{index + 1}</span>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eco Leaders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Eco Leaders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div 
              key={entry.id} 
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index < 3 ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(index)}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.profiles?.avatar_url || ''} alt="User" />
                  <AvatarFallback>
                    {entry.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{entry.profiles?.full_name || 'Anonymous User'}</p>
                  <p className="text-sm text-gray-500">{entry.total_orders} orders completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{entry.total_eco_points} pts</p>
                <p className="text-sm text-gray-500">₹{entry.total_cash_earned.toFixed(2)}</p>
              </div>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No leaderboard data available yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
