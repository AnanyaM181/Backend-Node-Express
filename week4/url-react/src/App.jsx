// Importing useState (for state) and useEffect (for side effects like timers)
import { useState, useEffect } from "react"

// Main App component
const App = () => {

  // Creating state 'human'
  // human → current state value
  // setHuman → function to update state
  const [human, setHuman] = useState({
    name: "Ananya",        // initial name
    age: 21,               // initial age
    city: "Bhubaneswar"    // initial city
  })

  // useEffect runs AFTER the component is rendered
  // Empty dependency array [] means: run only ONCE (on page load)
  useEffect(() => {

    // setInterval runs the given function repeatedly
    // Here it runs every 20000 milliseconds (20 seconds)
    const interval = setInterval(() => {

      // Updating state using previous state (prev)
      setHuman(prev => ({
        ...prev,          // copies old data (city stays safe)
        name: "Virat",    // updating name
        age: 36           // updating age
      }))

    }, 20000)

    // Cleanup function
    // Runs when component unmounts
    // Stops the interval to avoid memory leaks
    return () => clearInterval(interval)

  }, [])   // [] → run effect only once

  // JSX returned to the browser
  return (
    <div>

      {/* Displaying name from state */}
      <h1>{human.name}</h1>

      {/* Displaying age from state */}
      <h2>{human.age}</h2>

      {/* Passing city as prop to City component */}
      <City city={human.city} />

    </div>
  )
}

export default App


// Child component
// Receives props from parent (App)
const City = (props) => {

  // Displaying city received via props
  return <h1>{props.city}</h1>
}
