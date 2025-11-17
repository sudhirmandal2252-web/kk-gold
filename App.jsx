
import { useState } from "react";

export default function App() {
  const [audio1, setAudio1] = useState(null);
  const [audio2, setAudio2] = useState(null);
  const [output, setOutput] = useState(null);

  const clean = async () => {
    if (!audio1 || !audio2) {
      alert("Dono audio upload karo!");
      return;
    }
    const f = new FormData();
    f.append("audio1", audio1);
    f.append("audio2", audio2);

    const r = await fetch("http://localhost:8000/clean", { method:"POST", body:f });
    const b = await r.blob();
    setOutput(URL.createObjectURL(b));
  };

  return (
    <div style={{padding:20}}>
      <h1>Adobe Style Voice Cleaner</h1>
      <h3>Audio 1</h3>
      <input type="file" accept="audio/*" onChange={e=>setAudio1(e.target.files[0])}/>
      <h3>Audio 2</h3>
      <input type="file" accept="audio/*" onChange={e=>setAudio2(e.target.files[0])}/>
      <button onClick={clean}>Clean Voice</button>
      {output && <audio controls src={output}></audio>}
    </div>
  );
}
