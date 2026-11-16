"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CURRENT_BY_SUBJECT,
  DEFAULT_CURRENT_SUBTOPIC_ID,
  GCSE_SYLLABUS_BY_SUBJECT,
  getMainTopicForSubtopic,
  getSubtopicById,
  syllabusSubjectForSubtopic,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import type { TopicPracticeScope } from "@/lib/topic/topicPractice";
import {
  STORAGE_SYLLABUS_FOCUS,
  notifySyllabusFocusChanged,
} from "@/lib/studyFocusBridge";

const STORAGE_KEY_MAP = "studygrove.currentSubtopicsBySubject";
const STORAGE_KEY_LEGACY = "studygrove.currentSubtopicId";

export type CurrentSubtopicsBySubject = Record<SyllabusSubjectCode, string>;

function loadStoredMap(): CurrentSubtopicsBySubject {
  const base = { ...DEFAULT_CURRENT_BY_SUBJECT };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAP);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CurrentSubtopicsBySubject>;
      for (const sub of Object.keys(base) as SyllabusSubjectCode[]) {
        const id = parsed[sub];
        if (id && getSubtopicById(id)) base[sub] = id;
      }
      return base;
    }
    const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
    if (legacy) {
      const st = getSubtopicById(legacy);
      const syllabusSub = st ? syllabusSubjectForSubtopic(st) : undefined;
      if (syllabusSub) base[syllabusSub] = legacy;
    }
  } catch {
    /* ignore */
  }
  return base;
}

function persistMap(map: CurrentSubtopicsBySubject) {
  try {
    localStorage.setItem(STORAGE_KEY_MAP, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function useStudyTopicSelection() {
  const [currentBySubject, setCurrentBySubject] =
    useState<CurrentSubtopicsBySubject>(DEFAULT_CURRENT_BY_SUBJECT);
  const [focusSubject, setFocusSubject] =
    useState<SyllabusSubjectCode>("PHYSICS");
  const [syllabusSubject, setSyllabusSubject] =
    useState<SyllabusSubjectCode>("PHYSICS");
  const [selectedMainTopicId, setSelectedMainTopicId] = useState(
    () => getMainTopicForSubtopic(DEFAULT_CURRENT_SUBTOPIC_ID)?.id ?? "phy-energy-matter",
  );
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [practiceScope, setPracticeScope] = useState<TopicPracticeScope>(() => {
    const st = getSubtopicById(DEFAULT_CURRENT_SUBTOPIC_ID);
    return st ? { mode: "subtopic", subtopic: st } : { mode: "all" };
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const map = loadStoredMap();
    let focus: SyllabusSubjectCode = "PHYSICS";
    try {
      const storedFocus = localStorage.getItem(STORAGE_SYLLABUS_FOCUS);
      if (
        storedFocus &&
        (Object.keys(DEFAULT_CURRENT_BY_SUBJECT) as SyllabusSubjectCode[]).includes(
          storedFocus as SyllabusSubjectCode,
        )
      ) {
        focus = storedFocus as SyllabusSubjectCode;
      }
    } catch {
      /* ignore */
    }
    setCurrentBySubject(map);
    setFocusSubject(focus);
    setSyllabusSubject(focus);
    const focusId = map[focus] ?? map.PHYSICS;
    const main = getMainTopicForSubtopic(focusId);
    if (main) setSelectedMainTopicId(main.id);
    const st = getSubtopicById(focusId);
    if (st) setPracticeScope({ mode: "subtopic", subtopic: st });
    setHydrated(true);
  }, []);

  const focusSubtopicId = currentBySubject[focusSubject];
  const focusSubtopic = useMemo(
    () => getSubtopicById(focusSubtopicId),
    [focusSubtopicId],
  );
  const focusMainTopic = useMemo(
    () => getMainTopicForSubtopic(focusSubtopicId),
    [focusSubtopicId],
  );

  const mainTopics = GCSE_SYLLABUS_BY_SUBJECT[syllabusSubject];
  const activeMainTopic =
    mainTopics.find((t) => t.id === selectedMainTopicId) ?? mainTopics[0];

  const pinAsCurrent = useCallback((subtopicId: string) => {
    const st = getSubtopicById(subtopicId);
    if (!st) return;
    const syllabusSub = syllabusSubjectForSubtopic(st);
    if (!syllabusSub) return;

    setCurrentBySubject((prev) => {
      const next = { ...prev, [syllabusSub]: subtopicId };
      persistMap(next);
      return next;
    });

    setFocusSubject(syllabusSub);
    setSyllabusSubject(syllabusSub);
    try {
      localStorage.setItem(STORAGE_SYLLABUS_FOCUS, syllabusSub);
      notifySyllabusFocusChanged(syllabusSub);
    } catch {
      /* ignore */
    }

    const main = getMainTopicForSubtopic(subtopicId);
    if (main) setSelectedMainTopicId(main.id);
  }, []);

  const setFocus = useCallback((code: SyllabusSubjectCode) => {
    setFocusSubject(code);
    setSyllabusSubject(code);
    try {
      localStorage.setItem(STORAGE_SYLLABUS_FOCUS, code);
    } catch {
      /* ignore */
    }
    notifySyllabusFocusChanged(code);
    const main = getMainTopicForSubtopic(currentBySubject[code]);
    if (main) setSelectedMainTopicId(main.id);
  }, [currentBySubject]);

  const practiceSubtopic = useCallback((subtopicId: string) => {
    const st = getSubtopicById(subtopicId);
    if (!st) return;
    const syllabusSub = syllabusSubjectForSubtopic(st);
    if (syllabusSub) setFocus(syllabusSub);
    setPracticeScope({ mode: "subtopic", subtopic: st });
  }, [setFocus]);

  const practiceCurrentTopic = useCallback(() => {
    const st = getSubtopicById(currentBySubject[focusSubject]);
    if (st) setPracticeScope({ mode: "subtopic", subtopic: st });
  }, [currentBySubject, focusSubject]);

  const practiceWholeMainTopic = useCallback(() => {
    if (!activeMainTopic) return;
    setPracticeScope({
      mode: "mainTopic",
      mainTopicId: activeMainTopic.id,
      subtopicIds: activeMainTopic.subtopics.map((s) => s.id),
    });
  }, [activeMainTopic]);

  const handleSubjectChange = useCallback(
    (code: SyllabusSubjectCode) => {
      setSyllabusSubject(code);
      setFocusSubject(code);
      try {
        localStorage.setItem(STORAGE_SYLLABUS_FOCUS, code);
      } catch {
        /* ignore */
      }
      notifySyllabusFocusChanged(code);
      const pinnedId = currentBySubject[code];
      const main =
        getMainTopicForSubtopic(pinnedId) ??
        GCSE_SYLLABUS_BY_SUBJECT[code][0];
      if (main) setSelectedMainTopicId(main.id);
    },
    [currentBySubject],
  );

  const openSyllabusForSubject = useCallback(
    (code: SyllabusSubjectCode) => {
      setFocusSubject(code);
      setSyllabusSubject(code);
      try {
        localStorage.setItem(STORAGE_SYLLABUS_FOCUS, code);
      } catch {
        /* ignore */
      }
      notifySyllabusFocusChanged(code);
      const pinnedId = currentBySubject[code];
      const main =
        getMainTopicForSubtopic(pinnedId) ?? GCSE_SYLLABUS_BY_SUBJECT[code][0];
      if (main) setSelectedMainTopicId(main.id);
      setShowSyllabus(true);
    },
    [currentBySubject],
  );

  return {
    hydrated,
    currentBySubject,
    focusSubject,
    setFocus,
    focusSubtopicId,
    focusSubtopic,
    focusMainTopic,
    syllabusSubject,
    setSyllabusSubject: handleSubjectChange,
    selectedMainTopicId,
    setSelectedMainTopicId,
    activeMainTopic,
    mainTopics,
    showSyllabus,
    setShowSyllabus,
    openSyllabusForSubject,
    practiceScope,
    pinAsCurrent,
    practiceSubtopic,
    practiceCurrentTopic,
    practiceWholeMainTopic,
  };
}