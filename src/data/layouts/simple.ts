import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

const bleedsSize = {
  top: 2,
  left: 2,
  right: 2,
  bottom: 2
}

export const simpleLayout: ILayout = 
  {
    id: "simple",
    categoryId: "simple",
    rowSize: 2,
    groupSize: 6,
    width: 89,
    height: 75,
    title: "Made by @tartanllama",
    types: [LayoutType.SCENARIO, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: false,
    bleeds: {
      width: 93,
      height: 79,
      ...bleedsSize
    },
    campaignOptions: {
      includeCampaignIcon: true,
      includeEncounterSize: false,
      includeScenarioSize: false
    }
  };


export const simpleLayoutCategory: ILayoutCategory = {
  id: "simple",
  name: "Simple Black and White",
  // unlisted: true,
  author: {
    name: 'Sy Brand',
    image: BASE_PATH + '/images/authors/esarnetsky.jpg',
    donationUrl: 'https://www.tinkoff.ru/cf/8OT6GkH6KwE',
    url: 'https://t.me/sarnetsky',
    contacts: [
      {
        id: 'telegram',
        icon: 'telegram',
        url: 'https://t.me/sarnetsky'
      },
      {
        id: 'email',
        icon: 'mail',
        url: 'mailto:sarnetsky@gmail.com'
      }
    ]
  }
}