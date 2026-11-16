"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadFocusPreferences,
  saveFocusPreferences,
  type FocusMode,
} from "@/lib/focusPreferences";
import {
  resolveDefaultTimerFocus,
  SYLLABUS_FOCUS_CHANGED,
} from "@/lib/studyFocusBridge";
import {
  treeLabelForDuration,
  type FocusDuration,
} from "@/services/focusService";
import type { SubjectCode } from "@/types";

export type FocusSessionPhase = "idle" | "running" | "paused" | "completed";

export type FocusTimerSnapshot = {
  selectedDuration: FocusDuration;
  timeLeft: number;
  phase: FocusSessionPhase;
  focusMode: FocusMode;
  subject: SubjectCode;
  distractionShield: boolean;
  tabSwitches: number;
  progressPercent: number;
  formattedTime: string;
  treeLabel: string;
};

type SessionNotifyContext = {
  duration: FocusDuration;
  treeLabel: string;
  focusMode: FocusMode;
  subject: SubjectCode;
};

type UseFocusTimerOptions = {
  initialSubject?: SubjectCode;
  onSessionComplete: (
    durationMins: FocusDuration,
    mode: FocusMode,
    subject?: SubjectCode,
  ) => void;
  onSessionStart?: (ctx: SessionNotifyContext) => void;
  onSessionEnded?: (ctx: SessionNotifyContext) => void;
  onSessionCompletedUi?: () => void;
};

function prefsFromStorage() {
  return typeof window !== "undefined" ? loadFocusPreferences() : null;
}

export function useFocusTimer({
  initialSubject = "BIOLOGY",
  onSessionComplete,
  onSessionStart,
  onSessionEnded,
  onSessionCompletedUi,
}: UseFocusTimerOptions) {
  const prefs = prefsFromStorage();
  const [selectedDuration, setSelectedDuration] = useState<FocusDuration>(
    prefs?.duration ?? 25,
  );
  const [timeLeft, setTimeLeft] = useState((prefs?.duration ?? 25) * 60);
  const [phase, setPhase] = useState<FocusSessionPhase>("idle");
  const [focusMode, setFocusMode] = useState<FocusMode>(
    prefs?.mode ?? "subject",
  );
  const [subject, setSubject] = useState<SubjectCode>(
    prefs?.subject ?? initialSubject,
  );
  const [syncWithSyllabus, setSyncWithSyllabus] = useState(
    prefs?.syncWithSyllabus !== false,
  );
  const [distractionShield, setDistractionShield] = useState(true);
  const [tabSwitches, setTabSwitches] = useState(0);
  const completeRef = useRef(onSessionComplete);
  const sessionRewardedRef = useRef(false);
  const phaseRef = useRef(phase);

  completeRef.current = onSessionComplete;
  phaseRef.current = phase;

  const persistPrefs = useCallback(() => {
    saveFocusPreferences({
      duration: selectedDuration,
      mode: focusMode,
      subject,
      syncWithSyllabus,
    });
  }, [selectedDuration, focusMode, subject, syncWithSyllabus]);

  useEffect(() => {
    persistPrefs();
  }, [persistPrefs]);

  const applySyllabusDefaultIfIdle = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    const resolved = resolveDefaultTimerFocus();
    setFocusMode(resolved.mode);
    setSubject(resolved.subject);
  }, []);

  useEffect(() => {
    applySyllabusDefaultIfIdle();
    const onSyllabusFocus = () => {
      if (syncWithSyllabus && phaseRef.current === "idle") {
        applySyllabusDefaultIfIdle();
      }
    };
    window.addEventListener(SYLLABUS_FOCUS_CHANGED, onSyllabusFocus);
    return () =>
      window.removeEventListener(SYLLABUS_FOCUS_CHANGED, onSyllabusFocus);
  }, [applySyllabusDefaultIfIdle, syncWithSyllabus]);

  const isActive = phase === "running";
  const isCompleted = phase === "completed";
  const hasOngoingSession =
    phase === "running" || phase === "paused" || isCompleted;

  useEffect(() => {
    if (phase !== "idle") return;
    setTimeLeft(selectedDuration * 60);
  }, [selectedDuration, phase]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && isActive && distractionShield) {
        setTabSwitches((n) => n + 1);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [distractionShield, isActive]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0 || !isActive || sessionRewardedRef.current) return;
    sessionRewardedRef.current = true;
    setPhase("completed");
    const treeLabel = treeLabelForDuration(selectedDuration);
    completeRef.current(
      selectedDuration,
      focusMode,
      focusMode === "custom" ? undefined : subject,
    );
    onSessionEnded?.({
      duration: selectedDuration,
      treeLabel,
      focusMode,
      subject,
    });
    onSessionCompletedUi?.();
  }, [
    timeLeft,
    isActive,
    selectedDuration,
    focusMode,
    subject,
    onSessionEnded,
    onSessionCompletedUi,
  ]);

  const startFocus = useCallback(() => {
    sessionRewardedRef.current = false;
    if (phase === "idle") {
      const resolved = resolveDefaultTimerFocus();
      const modeForSession: FocusMode =
        syncWithSyllabus && resolved.mode === "subject" ? "subject" : focusMode;
      const subjectForSession: SubjectCode =
        modeForSession === "subject" && syncWithSyllabus
          ? resolved.subject
          : subject;
      if (syncWithSyllabus && resolved.mode === "subject") {
        setFocusMode("subject");
        setSubject(resolved.subject);
      }
      const treeLabel = treeLabelForDuration(selectedDuration);
      onSessionStart?.({
        duration: selectedDuration,
        treeLabel,
        focusMode: modeForSession,
        subject: subjectForSession,
      });
    }
    setPhase("running");
  }, [
    phase,
    onSessionStart,
    selectedDuration,
    focusMode,
    subject,
    syncWithSyllabus,
  ]);

  const pauseFocus = useCallback(() => {
    setPhase("paused");
  }, []);

  const toggleFocus = useCallback(() => {
    if (phase === "running") {
      pauseFocus();
      return;
    }
    if (phase === "paused" || phase === "idle") {
      startFocus();
    }
  }, [phase, pauseFocus, startFocus]);

  const handleReset = useCallback(() => {
    setPhase("idle");
    setTimeLeft(selectedDuration * 60);
    setTabSwitches(0);
    sessionRewardedRef.current = false;
    applySyllabusDefaultIfIdle();
  }, [selectedDuration, applySyllabusDefaultIfIdle]);

  const prepareNewSession = useCallback(() => {
    setSelectedDuration(25);
    setTimeLeft(25 * 60);
    setPhase("idle");
    setTabSwitches(0);
    setSubject(initialSubject);
    sessionRewardedRef.current = false;
    applySyllabusDefaultIfIdle();
  }, [initialSubject, applySyllabusDefaultIfIdle]);

  const openConfigurator = useCallback(() => {
    if (phase === "idle") applySyllabusDefaultIfIdle();
  }, [phase, applySyllabusDefaultIfIdle]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = Math.round(
    ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100,
  );
  const treeLabel = treeLabelForDuration(selectedDuration);

  const snapshot: FocusTimerSnapshot = {
    selectedDuration,
    timeLeft,
    phase,
    focusMode,
    subject,
    distractionShield,
    tabSwitches,
    progressPercent,
    formattedTime,
    treeLabel,
  };

  return {
    snapshot,
    selectedDuration,
    setSelectedDuration,
    timeLeft,
    focusMode,
    setFocusMode,
    subject,
    setSubject,
    syncWithSyllabus,
    setSyncWithSyllabus,
    distractionShield,
    setDistractionShield,
    tabSwitches,
    phase,
    isActive,
    isCompleted,
    hasOngoingSession,
    progressPercent,
    formattedTime,
    treeLabel,
    startFocus,
    pauseFocus,
    toggleFocus,
    handleReset,
    prepareNewSession,
    openConfigurator,
    applySyllabusDefaultIfIdle,
  };
}