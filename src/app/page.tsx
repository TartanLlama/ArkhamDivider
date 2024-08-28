'use client';
import { DividerList, Row, Container, AppLoader, AppSettings } from "@/components";
import S from "./page.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectDividerList } from "@/store/features/dividers/dividers";
import { loadIcons, selectIconSet } from "@/store/features/icons/icons";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loadScenarios } from "@/store/features/scenarios/scenarios";
import { useTranslation } from "react-i18next";
import { selectLanguage } from "@/store/features/language/language";
import '@/bootstrap'
import { loadCampaigns } from "@/store/features/campaigns/campaigns";

export default function Home() {

  const dispatch = useAppDispatch();
	const dividers = useAppSelector(selectDividerList);
  const language = useAppSelector(selectLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(loadIcons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadScenarios(language));
    dispatch(loadCampaigns(language));
  }, [dispatch, language]);

  return (
    <Container>
      <AppLoader>
        <AppSettings/>
        <DividerList dividers={dividers}/>
      </AppLoader>
    </Container>
  );
}
