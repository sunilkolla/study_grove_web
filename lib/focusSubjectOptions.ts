import { SYLLABUS_SUBJECTS } from "@/data/gcseSyllabus";
import type { SubjectCode } from "@/types";

export const FOCUS_SUBJECT_OPTIONS: { value: SubjectCode; label: string }[] =
  SYLLABUS_SUBJECTS.map((s) => ({
    value: s.mapsTo,
    label: s.label,
  }));