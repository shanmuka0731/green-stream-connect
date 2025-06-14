
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_cash_earned: number;
  total_eco_points: number;
  total_orders: number;
  updated_at: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  };
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      // Get leaderboard data
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from('eco_score_leaderboard')
        .select('*')
        .order('total_eco_points', { ascending: false })
        .limit(10);

      if (leaderboardError) throw leaderboardError;

      // Get profile data for each user
      const entriesWithProfiles = await Promise.all(
        (leaderboardData || []).map(async (entry) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', entry.user_id)
            .single();
          
          return {
            ...entry,
            profiles: profile || { full_name: 'Unknown User', avatar_url: null }
          };
        })
      );

      setEntries(entriesWithProfiles);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No leaderboard data available yet.
        </div>
      ) : (
        entries.map((entry, index) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-yellow-600" />
                    ) : index === 1 ? (
                      <Star className="h-5 w-5 text-gray-400" />
                    ) : index === 2 ? (
                      <Award className="h-5 w-5 text-orange-600" />
                    ) : (
                      <span className="text-sm font-medium text-green-700">#{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{entry.profiles.full_name}</h3>
                    <p className="text-sm text-gray-500">{entry.total_orders} orders completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{entry.total_eco_points} pts</div>
                  <div className="text-sm text-gray-500">₹{entry.total_cash_earned.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
