import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';

interface ReputationBadgeProps {
  userId: string;
  className?: string;
}

const LEVEL_ICONS: Record<string, string> = {
  'Explorer': '🌱',
  'Newcomer': '⭐',
  'Rising Star': '🌟',
  'Trendsetter': '🔥',
  'Style Maven': '👑',
  'Fashion Legend': '🏆',
};

export function ReputationBadge({ userId, className }: ReputationBadgeProps) {
  const [score, setScore] = useState<number | null>(null);
  const [level, setLevel] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.rpc('get_user_reputation', { p_user_id: userId });
      if (data && data.length > 0) {
        setScore(data[0].reputation_score);
        setLevel(data[0].reputation_level);
      }
    };
    fetch();
  }, [userId]);

  if (score === null) return null;

  const icon = LEVEL_ICONS[level] || '🌱';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={`/reputation?user=${userId}`}>
          <Badge variant="secondary" className={`text-xs gap-1 cursor-pointer hover:bg-accent ${className}`}>
            {icon} {score}
          </Badge>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{level} · {score} reputation points</p>
      </TooltipContent>
    </Tooltip>
  );
}
