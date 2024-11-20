import S from './SimpleDivider.module.scss';

import { DividerContent, DividerMenu, DividerText, Icon, NotExportable } from '@/components';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { selectLanguage } from '@/store/features/language/language';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useIconSelect } from '@/hooks/useIconSelect';
import { DividerProps } from '../../common/Divider/Divider';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { DividerType } from '@/types/dividers';

export const SimpleDivider = (props: DividerProps) => {
  const { t } = useStoryTranslation(props.story);
  const {
    story,
    name = '',
    id,
    type,
    className
  } = props;

  const [previewIcon, setPreviewIcon] = useIconSelect({
    defaultIcon: props.previewIcon || props.icon
  });
  const [campaignIcon, setCampaignIcon] = useIconSelect({
    defaultIcon: props.campaignIcon
  });
  console.log("Campaign icon ", campaignIcon);

  const defaultStoryName = story && t(story.name);
  const [_storyName, setStoryName] = useState(defaultStoryName);

  const translatedName = t(name);
  const [_title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? 'en' : language;
  
  useEffect(() => {
    setStoryName(defaultStoryName);
  }, [defaultStoryName]);

  const specialIcon = (() => {
    return previewIcon;
  })();

  const isScenario = [
    DividerType.ENCOUNTER,
    DividerType.SCENARIO, 
    DividerType.CAMPAIGN,
].includes(type);

console.log("Is scenario ", isScenario);

  const setSpecialIcon = setPreviewIcon;

  return (
    <div className={classNames(
      S.container,
      S[realLanguage],
      className
    )}>
      <DividerContent className={S.content}>
        <NotExportable>
          <div className={S.menu}>
            <DividerMenu id={id} className={S.menuInner}/>
          </div>
        </NotExportable>
        {specialIcon && (
          <>
            <div
              className={classNames(
                S.iconCorner,
                S.iconCorner_horizontal
              )}
              onClick={setSpecialIcon}
            >
              <div className={S.icon}>
                <Icon icon={specialIcon}/>
              </div>
            </div>
            <div
              className={classNames(
                S.iconCorner,
                S.iconCorner_vertical
              )}
              onClick={setSpecialIcon}
            >
              <div className={classNames(
                S.verticalContainer,
                S.verticalIconContainer
              )}>
                <div className={S.icon}>
                  <Icon icon={specialIcon}/>
                </div>
              </div>
            </div>
          </>
        )}
        {isScenario && campaignIcon && (
			<div 
				className={classNames(
					S.campaignIcon
				)}
				onClick={setCampaignIcon}
			>
                <div className={S.icon}>
				    <Icon icon={campaignIcon}/>
                </div>
			</div>
				)}
        <div 
          className={classNames(
            S.title,
            S.title_horizontal
          )}
          >
            <DividerText
              defaultValue={translatedName}
              onChange={setTitle}
              onClear={() => setTitle(translatedName)}
              fixedFontSize={false}
              minFontSize={100}
            />
        </div>
      </DividerContent>
    </div>
  );
}