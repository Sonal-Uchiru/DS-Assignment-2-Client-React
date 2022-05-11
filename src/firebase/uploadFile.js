import { storage } from './configuration'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'

export function uploadFile(file) {
    const storageRef = ref(storage, `Movies(images)/${file[0].name}`)
    const uploadTask = uploadBytesResumable(storageRef, file[0])
    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                if (progress >= 100) {
                    getDownloadURL(storageRef).then((url) => {
                        resolve(url)
                    })
                }
            },
            (error) => {
                reject(error)
            }
        )
    })
}
