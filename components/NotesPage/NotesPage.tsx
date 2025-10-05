"use client";

import React, { ReactNode } from "react";

import css from "./NotesPage.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { NoteListResponse } from "@/types/note";
import LayoutNotes from "../LayoutNotes/LayoutNotes";
import SidebarNotes from "../SidebarNotes/SidebarNotes";
import NoteList from "../NoteList/NoteList";
import Link from "next/link";

type Props = {
  data: NoteListResponse;
  children: ReactNode;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
};

const NotesPage = ({ data, setPage, setSearch }: Props) => {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        <Pagination totalPages={data.totalPages} onPageChange={setPage} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      <LayoutNotes sidebar={<SidebarNotes />}>
        {data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        )}
      </LayoutNotes>
    </div>
  );
};

export default NotesPage;
