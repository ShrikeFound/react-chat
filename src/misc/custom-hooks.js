import { useCallback, useEffect, useState } from "react"

//toggle hook for sidebar draw
export const useModalState = (defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => {
    setIsOpen(true)
  },[])
  
  const close = useCallback(() => {
    setIsOpen(false)
  },[])

  return {
    isOpen,
    open,
    close
  }

}



export const useMediaQuery = (query) => {
  
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);
    
    const listener = (e) => {
      setMatches(e.matches)
    }


    queryList.addListener(listener);

    return () => {
      queryList.removeListener(listener);
    }

  },[query])
  

  return matches


}