import { useState } from 'react'
import './App.css'
import { storage } from './firabase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function App() {
  const [imgURL, setimgURL] = useState("")
  const [progress, setProgress] = useState("0")

  const handleupload = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0]
    if (!file) return;

    const storageRef = ref(storage, `imagens/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      error => { alert(error) },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setimgURL(url)
        })
      }
    )
  }

  return (
    <>
      <div>
        <header>
          <form onSubmit={handleupload}>
            <input type="file" />
            <button type='submit'>enviar</button>
          </form>
          <br />
          <br />
          {!imgURL && <progress value={progress} max="100" />}
          {imgURL && <img src={imgURL} alt="imagem" />}
        </header>
      </div>
    </>
  )
}

export default App
