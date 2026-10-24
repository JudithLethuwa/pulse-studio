import { useEffect, useState } from 'react'

// Fetches JSON from the API when the component first appears
export default function useApi(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((json) => {
        if (!ignore) setData(json)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [path])

  return { data, error }
}