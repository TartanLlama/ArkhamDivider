import { IStory } from "@/types/api";
import { safePropEq } from "@/util/criteria";
import { anyPass, propEq } from "ramda";

export const withoutReturns = (story: IStory) => !story.return_to_code;

export const isCampaign = propEq('campaign', 'type');
export const isSideStory = propEq('side_story', 'type');
export const isSideCampaign = propEq('side_campaign', 'type');
export const isChallenge = propEq('challenge', 'type');
export const isStandalone = propEq('standalone', 'type');
export const isCustom = (story: IStory) => Boolean(story.custom_content);

export const isSideContent = anyPass([
  isSideStory,
  isStandalone
]);

export const isReturnPack = (story: IStory) => Boolean(story.return_to_code);

export const withReturnTo = (code: string) => safePropEq(code, 'return_to_code');

export const onlyWithScenarioEncounters = ({ encounter_sets, scenario_encounter_sets }: IStory) => 
  encounter_sets.filter(
    code => !scenario_encounter_sets.includes(code)
  ).length === 0;