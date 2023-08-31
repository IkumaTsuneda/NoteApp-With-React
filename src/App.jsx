import { useEffect, useState } from 'react'
import './App.css'
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  //ノートの状態変数
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    //notesが変更された時、ローカルストレージにnotesを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    //初期表示時、一番上のノートが選択された状態にする
    if(notes.length !== 0){
      setActiveNote(notes[0].id)
    }
  }, []);

  /**
   * 追加ボタンの処理
   */
  const onAddNote = () => {
    const newNote ={
      id: uuid(),
      title: "新しいノート",
      content: "", 
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
  };

  /**
   * 削除ボタンの処理
   * 
   * @param {*} id 削除するノートのid
   */
  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  /**
   * 選択されたノートを特定する処理
   * 
   * @returns 選択されたノートのオブジェクト
   */
    const getActiveNote = () => {
      return notes.find((note) => note.id === activeNote)
    };

  /**
   * 修正後のノートの配列を返却する処理
   */
   const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id){
        return updatedNote;
      }else{
        return note;
      }
    });
    setNotes(updatedNotesArray);
  }

  return (
    <>
      <div className="App">
        <Sidebar 
         onAddNote={onAddNote} 
          notes={notes} 
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default App;
