import { useState, useRef } from 'react'
import './App.css'
import { storage } from './firabase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function App() {
  const [imgURLs, setImgURLs] = useState([])
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleUpload = (event) => {
    event.preventDefault()
    const files = event.target[0]?.files
    if (!files || files.length === 0) return

    const promises = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const storageRef = ref(storage, `imagens/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      promises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setProgress(progress)
            },
            error => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(url => {
                resolve(url)
              })
            }
          )
        })
      )
    }

    Promise.all(promises).then(urls => {
      setImgURLs([...imgURLs, ...urls])
    }).catch(error => {
      alert(error)
    })
  }

  const handleClearSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  return (
    <>
      <div>
        <header>
          <form onSubmit={handleUpload}>
            <input type="file" multiple ref={fileInputRef} />
            <button type='submit'>enviar</button>
          </form>
          <button onClick={handleClearSelection}>limpar seleção</button>
          <br />
          <br />
          {imgURLs.length === 0 && <progress value={progress} max="100" />}
          {imgURLs.map(url => (
            <img key={url} src={url} alt="imagem" />
          ))}
        </header>
      </div>
    </>
  )
}

export default App
