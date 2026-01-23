import { useState } from "react"

const App = () => {
  const [human,setHuman] = useState ({
    name : "Ananya" ,
    age : 21 ,
    city : "Bhubaneswar"
  })
  setInterval = () => {
  setHuman({
    name : "Virat" ,
    age : 36
  }) , 20000 }
return (
 <div>
  <h1>
    {human.name}
  </h1>
  <h2>
    {human.age}
  </h2> 
  <h3>
   {/* <City city={"Seoul"}></City> */}
  <City city={human.city}></City>
  </h3>
  </div> 
)}
export default App
 
const City = (props) => {
  return (
    <div>
      <h1>
        {props.city}
      </h1>
    </div>
  )
}
