import { OptionProps, components } from 'react-select';

import { IStory } from '@/types/api';
import { StorySelectValue } from '@/components';


export type StorySelectOptionProps = OptionProps<{
  label: string,
  isTranslated: boolean
  value: IStory
}>

export const StorySelectOption = (props: StorySelectOptionProps) => {
  const { children, data, isSelected } = props;

  return (
    <components.Option {...props}>
      <StorySelectValue 
        story={data.value} 
        isSelected={isSelected}
        isTranslated={data.isTranslated}
      >
        {children}
      </StorySelectValue>
    </components.Option>
  )
}