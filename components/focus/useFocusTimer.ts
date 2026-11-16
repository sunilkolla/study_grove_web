"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadFocusPreferences,
  saveFocusPreferences,
} from "@/lib/focusPreferences";
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
  subject: SubjectCode;
  distractionShield: boolean;
  tabSwitches: number;
  progressPercent: number;
  formattedTime: string;
  treeLabel: string;
};

type UseFocusTimerOptions = {
  initialSubject?: SubjectCode;
  onSessionComplete: (durationMins: FocusDuration, subject: SubjectCode) => void;
  onSessionStart?: (durationMins: FocusDuration, treeLabel: string) => void;
  onSessionEnded?: (durationMins: FocusDuration, treeLabel: string) => void;
  onSessionCompletedUi?: () => void;
};

export function useFocusTimer({
  initialSubject = "BIOLOGY",
  onSessionComplete,
  onSessionStart,
  onSessionEnded,
  onSessionCompletedUi,
}: UseFocusTimerOptions) {
  const prefs = typeof window !== "undefined" ? loadFocusPreferences() : null;
  const [selectedDuration, setSelectedDuration] = useState<FocusDuration>(
    prefs?.duration ?? 25,
  );
  const [timeLeft, setTimeLeft] = useState(
    (prefs?.duration ?? 25) * 60,
  );
  const [phase, setPhase] = useState<FocusSessionPhase>("idle");
  const [subject, setSubject] = useState<SubjectCode>(
    prefs?.subject ?? initialSubject,
  );
  const [distractionShield, setDistractionShield] = useState(true);
  const [tabSwitches, setTabSwitches] = useState(0);
  const completeRef = useRef(onSessionComplete);
  const sessionRewardedRef = useRef(false);

  completeRef.current = onSessionComplete;

  useEffect(() => {
    saveFocusPreferences({ duration: selectedDuration, subject });
  }, [selectedDuration, subject]);

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
    completeRef.current(selectedDuration, subject);
    onSessionEnded?.(selectedDuration, treeLabelForDuration(selectedDuration));
    onSessionCompletedUi?.();
  }, [timeLeft, isActive, selectedDuration, subject, onSessionEnded, onSessionCompletedUi]);

  const startFocus = useCallback(() => {
    sessionRewardedRef.current = false;
    if (phase === "idle") {
      onSessionStart?.(selectedDuration, treeLabelForDuration(selectedDuration));
    }
    setPhase("running");
  }, [phase, onSessionStart, selectedDuration]);

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
  }, [selectedDuration]);

  const prepareNewSession = useCallback(() => {
    setSelectedDuration(25);
    setTimeLeft(25 * 60);
    setPhase("idle");
    setTabSwitches(0);
    setSubject(initialSubject);
    sessionRewardedRef.current = false;
  }, [initialSubject]);

  const openConfigurator = useCallback(() => {
    if (phase !== "idle") return;
  }, [phase]);

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
    subject,
    setSubject,
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
  };
}