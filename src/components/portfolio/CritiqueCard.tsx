import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Star, TrendingUp, Lightbulb, Eye, EyeOff, Trash2, GraduationCap, ArrowRight, RefreshCw, User, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getAllCourses } from '@/data/courseCategories';

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  ai_critique: any;
  critique_summary: string | null;
  scores: any;
  is_public: boolean;
  created_at: string;
  contributor_name?: string | null;
  contributor_city?: string | null;
}

interface CritiqueCardProps {
  item: PortfolioItem;
  onUpdate: () => void;
  showActions?: boolean;
}

const scoreLabels: Record<string, string> = {
  proportion: 'Proportion & Silhouette',
  colorTheory: 'Color Theory',
  technicalExecution: 'Technical Execution',
  trendAlignment: 'Trend Alignment',
  commercialViability: 'Commercial Viability',
  creativity: 'Creativity & Originality',
  presentationQuality: 'Presentation Quality',
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-orange-600';
};

const getProgressColor = (score: number) => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-yellow-500';
  return 'bg-orange-500';
};

const CritiqueCard = ({ item, onUpdate, showActions = true }: CritiqueCardProps) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [reCritiquing, setReCritiquing] = useState(false);

  const critique = item.ai_critique;
  const scores = item.scores || critique?.scores;

  const handleReCritique = async () => {
    setReCritiquing(true);
    try {
      const { data: critiqueData, error: critiqueError } = await supabase.functions.invoke('portfolio-critique', {
        body: {
          imageUrl: item.image_url,
          title: item.title,
          category: item.category,
          description: item.description || '',
        },
      });

      if (critiqueError) throw critiqueError;

      const newCritique = critiqueData?.critique;
      if (!newCritique) throw new Error('No critique returned');

      const { error: updateError } = await supabase
        .from('portfolio_items' as any)
        .update({
          ai_critique: newCritique,
          critique_summary: newCritique.summary || null,
          scores: newCritique.scores || null,
        })
        .eq('id', item.id);

      if (updateError) {
        console.error('Failed to save re-critique:', updateError);
      }

      toast({ title: 'Re-critique complete! ✨', description: 'Fresh AI feedback is ready.' });
      onUpdate();
    } catch (error: any) {
      console.error('Re-critique error:', error);
      toast({ title: 'Re-critique failed', description: error.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setReCritiquing(false);
    }
  };


  const toggleVisibility = async () => {
    setToggling(true);
    const { error } = await supabase
      .from('portfolio_items' as any)
      .update({ is_public: !item.is_public })
      .eq('id', item.id);

    if (error) {
      toast({ title: 'Error', description: 'Could not update visibility.', variant: 'destructive' });
    } else {
      toast({ title: item.is_public ? 'Made private' : 'Made public' });
      onUpdate();
    }
    setToggling(false);
  };

  const deleteItem = async () => {
    const { error } = await supabase
      .from('portfolio_items' as any)
      .delete()
      .eq('id', item.id);

    if (error) {
      toast({ title: 'Error', description: 'Could not delete item.', variant: 'destructive' });
    } else {
      toast({ title: 'Portfolio item deleted' });
      onUpdate();
    }
  };

  const categoryLabel = item.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[280px_1fr] gap-0">
        {/* Image */}
        <div className="relative aspect-square md:aspect-auto bg-muted">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm">
            {categoryLabel}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {(item.contributor_name || item.contributor_city) && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    {item.contributor_name && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.contributor_name}
                      </span>
                    )}
                    {item.contributor_city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.contributor_city}
                      </span>
                    )}
                  </div>
                )}
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {scores?.overall && (
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="font-bold text-primary">{scores.overall}/10</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-3 pt-0">
            {/* Summary */}
            {critique?.summary && (
              <p className="text-sm leading-relaxed">{critique.summary}</p>
            )}

            {/* Score bars */}
            {scores && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(scoreLabels).map(([key, label]) => {
                  const score = scores[key];
                  if (!score) return null;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getProgressColor(score)}`}
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Strengths & Improvements preview */}
            {critique?.strengths && (
              <div className="flex flex-wrap gap-1.5">
                {critique.strengths.slice(0, 2).map((s: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                    ✨ {s}
                  </Badge>
                ))}
              </div>
            )}

            {/* Expand/Collapse */}
            {expanded && critique && (
              <div className="space-y-4 pt-2">
                <Separator />

                {/* Strengths */}
                {critique.strengths?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <Star className="h-4 w-4 text-green-600" /> Strengths
                    </h4>
                    <ul className="space-y-1">
                      {critique.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-green-600 shrink-0">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {critique.improvements?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <TrendingUp className="h-4 w-4 text-yellow-600" /> Areas to Improve
                    </h4>
                    <ul className="space-y-1">
                      {critique.improvements.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-yellow-600 shrink-0">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Detailed Feedback */}
                {critique.detailedFeedback && Object.keys(critique.detailedFeedback).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Detailed Analysis</h4>
                    <div className="space-y-2">
                      {Object.entries(critique.detailedFeedback).map(([key, feedback]) => {
                        if (!feedback) return null;
                        const label = scoreLabels[key] || key;
                        return (
                          <div key={key} className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-primary mb-1">{label}</p>
                            <p className="text-sm text-muted-foreground">{feedback as string}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {critique.actionableNextSteps?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" /> Next Steps
                    </h4>
                    <ol className="space-y-1">
                      {critique.actionableNextSteps.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary font-medium shrink-0">{i + 1}.</span> {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Inspiration References */}
                {critique.inspirationReferences?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">🎨 Inspiration References</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {critique.inspirationReferences.map((ref: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Courses */}
                {critique.recommendedCourses?.length > 0 && (
                  <div>
                    <Separator className="my-2" />
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                      <GraduationCap className="h-4 w-4 text-primary" /> Recommended Courses to Improve
                    </h4>
                    <div className="space-y-2.5">
                      {critique.recommendedCourses.map((rec: { slug: string; reason: string }, i: number) => {
                        const course = getAllCourses().find(c => c.slug === rec.slug);
                        if (!course) return null;
                        return (
                          <div key={i} className="flex items-start gap-3 bg-primary/5 rounded-lg p-3 border border-primary/10">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight">{course.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {course.duration} • {course.fees}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.reason}</p>
                            </div>
                            <Button asChild size="sm" variant="outline" className="shrink-0 mt-0.5">
                              <Link to={`/courses/${rec.slug}`}>
                                Explore <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {critique && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs"
                >
                  {expanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                  {expanded ? 'Less' : 'Full Critique'}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReCritique}
                disabled={reCritiquing}
                className="text-xs"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${reCritiquing ? 'animate-spin' : ''}`} />
                {reCritiquing ? 'Re-critiquing...' : 'Re-Critique'}
              </Button>
              {showActions && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleVisibility}
                    disabled={toggling}
                    className="text-xs"
                  >
                    {item.is_public ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                    {item.is_public ? 'Make Private' : 'Make Public'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={deleteItem}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default CritiqueCard;
