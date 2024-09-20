import { IEncounterSet, IStory } from "@/types/api";
import { isNotNil, propEq } from "ramda";
import { getEncounterSize } from "./getEncounterSize";
import { definedIf, uniqId } from "@/util/common";
import { IGetStoryDividersOptions } from "./getStoryDividers";

type IGetEncounterDividersParams = IGetStoryDividersOptions & {
  scenarioIcons: string[]
}

export const getEncounterDividers = (options: IGetEncounterDividersParams) => {
  const {
    story,
    scenarioIcons,
    includeExtraSets,
    includeScenarioEncounterSet,
    includeCampaignIcon,
    encounterSets
  } = options;

  const {
    icon,
    encounter_sets,
    extra_encounter_sets
  } = story;

  const campaignIcon = definedIf(icon, includeCampaignIcon);

  const extraEncounters = includeExtraSets ? extra_encounter_sets : [];

  const encounters = [
    ...encounter_sets,
    ...extraEncounters
  ];

  return encounters
    .map(code => {
      const isExtra = extra_encounter_sets.includes(code);
      const encounter = encounterSets.find(propEq(code, 'code'));
      
      if (!encounter) {
        return;
      }
      
      const {
        name,
        icon,
      } = encounter;

      const isScenario = Boolean(icon) && scenarioIcons.includes(icon as string);

      if (!includeScenarioEncounterSet && isScenario) {
        return;
      }
      
      const sizeData = getEncounterSize({
        ...options,
        isExtra,
        encounter,
      })

      return {
        id: uniqId() + code,
        ...sizeData,
        name,
        icon,
        campaignIcon,
        type: 'encounter'
      }
    })
  .filter(isNotNil);
}