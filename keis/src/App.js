import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"


function App() {
  const [gold, setGold] = useState(0)
  const [guc1, setGuc1] = useState(0)
  const [guc2, setGuc2] = useState(0)
  const [guc3, setGuc3] = useState(0)
  const [guc4, setGuc4] = useState(0)

  const workingForGold = () => {
    setTimeout(() => {
      setGold(prevGold => prevGold + 15); 
    }, 3000); 
  }

  const calculateCost = (level) => {
    let cost = 0;
    for (let i = 0; i <= level; i++) {
        cost += Math.pow(2, i); 
    }
    return cost;
}

  const decreaseGuc1 = () => {
    const increaseAmount = guc1 + 1;
    const cost = calculateCost(increaseAmount);
    if (gold >= cost) { 
        setGold(prevGold => prevGold - cost);
        setGuc1(increaseAmount);
    }
}

const decreaseGuc2 = () => {
    const increaseAmount = guc2 + 1;
    const cost = calculateCost(increaseAmount);
    if (gold >= cost) { 
        setGold(prevGold => prevGold - cost);
        setGuc2(increaseAmount);
    }
}

const decreaseGuc3 = () => {
    const increaseAmount = guc3 + 1;
    const cost = calculateCost(increaseAmount);
    if (gold >= cost) { 
        setGold(prevGold => prevGold - cost);
        setGuc3(increaseAmount);
    }
}

  const decreaseGuc4 = () => {
    const increaseAmount = guc4 + 1;
    const cost = calculateCost(increaseAmount);
    if (gold >= cost) { 
        setGold(prevGold => prevGold - cost);
        setGuc4(increaseAmount);
    }
  }


  return (
    <div>
        <div className="container">
            GOLD : {gold}
            <div className="row">
                <div className="col-md-2">
                    <div>
                        Güç 1 (Maliyet: {calculateCost(guc1 + 1)})
                        <div className="btn" onClick={decreaseGuc1}>+</div>
                        {guc1}
                    </div>
                    <div>
                        Güç 2 (Maliyet: {calculateCost(guc2 + 1)})
                        <div className="btn" onClick={decreaseGuc2}>+</div>
                        {guc2}
                    </div>
                    <div>
                        Güç 3 (Maliyet: {calculateCost(guc3 + 1)})
                        <div className="btn" onClick={decreaseGuc3}>+</div>
                        {guc3}
                    </div>
                    <div>
                        Güç 4 (Maliyet: {calculateCost(guc4 + 1)})
                        <div className="btn" onClick={decreaseGuc4}>+</div>
                        {guc4}
                    </div>
                </div>
                <div className="btn" onClick={workingForGold}>Çalış</div>
            </div>
        </div>
    </div>
)
}

export default App
