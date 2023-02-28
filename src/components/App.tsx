import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import '../App.css';
import { NoteCircle } from './NoteCircle'
import { RequestInput } from './RequestInput';
// @ts-ignore
import { chord, note } from 'teoria'
import { useAppDispatch } from '../store/hooks';
import { interpretInput } from '../logic/inputInterpretation';

const chordToNotes = (chrd: any) => chrd.notes().map((n: any) => n.toString()).map((s: any) => s.substring(0, s.length - 1))

const baseNotes = ['C', 'Db', 'C#', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const chordTypes = ['7', 'min7', 'maj7', '9', 'maj9']
function randoChord() {
  const baseI = Math.floor(Math.random() * baseNotes.length)
  const base = baseNotes[baseI]
  const ctypeI = Math.floor(Math.random() * chordTypes.length)
  const ctype = chordTypes[ctypeI]
  return chordToNotes(chord(note.fromString(base+'4'), ctype))
}

function App() {

  let [c1, setC1] = useState(randoChord())
  let [c2, setC2] = useState(randoChord())
  let [c3, setC3] = useState(randoChord())

  // setInterval(() => {
  //   setC1(randoChord())
  //   setC2(randoChord())
  //   setC3(randoChord())
  //   console.log('new chords')
  // }, 5000);
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     interpretInput('d dorian')
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="App">
      <RequestInput/>
    <div className="NoteCircle">
      <svg viewBox={"-1000 -550 2000 1100"}>
        <NoteCircle position='outer' innerD={390} outerD={390+100}></NoteCircle>
        <NoteCircle position='inner' innerD={285} outerD={285+100}></NoteCircle>
        <NoteCircle position='primary' innerD={180} outerD={180+100}></NoteCircle>
      </svg>
      </div>
    </div>
  );
}

export default App;
