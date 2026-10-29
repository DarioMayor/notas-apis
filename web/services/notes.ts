import type { Note } from "@/lib/notes";
import { request } from "@/services/http";

export type CreateNoteRequest = {
  title: string;
  text: string;
  minutes: number;
};

export type UpdateNoteRequest = CreateNoteRequest & {
  id: string;
};

export type MarkNoteNotifiedRequest = {
  id: string;
  notified: true;
};

export type NotesResponse = {
  notes: Note[];
};

export type NoteResponse = {
  note: Note;
};

export type DeleteNoteResponse = {
  ok: true;
};

export function getNotes() {
  return request<NotesResponse>("/notas");
}

export function createNote(body: CreateNoteRequest) {
  return request<NoteResponse>("/notas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateNote(body: UpdateNoteRequest) {
  return request<NoteResponse>(`/notas/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function markNoteNotified(id: string) {
  const body: MarkNoteNotifiedRequest = { id, notified: true };
  return request<NoteResponse>(`/notas/${id}/notified`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteNote(id: string) {
  return request<DeleteNoteResponse>(`/notas/${id}`, { method: "DELETE" });
}
