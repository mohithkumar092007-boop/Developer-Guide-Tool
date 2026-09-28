import { ExperienceLevel, LearningStyle, OnboardingStep } from '../../../database/types';
import { db } from '../../../database/index';

export function generateCustomOnboardingRoadmap(
  experienceLevel: ExperienceLevel,
  learningStyle: LearningStyle,
  primaryLanguage: string
): OnboardingStep[] {
  const steps = db.getOnboardingSteps();

  if (experienceLevel === 'Beginner') {
    return steps.map((s: OnboardingStep) => ({
      ...s,
      estimatedMins: Math.round(s.estimatedMins * 1.3),
      description: `[Beginner Guided] ${s.description} Includes detailed diagrams and prerequisite glossary.`,
    }));
  }

  if (experienceLevel === 'Advanced') {
    return steps.map((s: OnboardingStep) => ({
      ...s,
      estimatedMins: Math.round(s.estimatedMins * 0.7),
      description: `[Fast-Track] ${s.description}`,
    }));
  }

  return steps;
}
