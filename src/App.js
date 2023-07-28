import logo from './logo.svg';
import './App.css';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import { useState } from 'react';

function App() {
  const [rn, setRn] = useState("")
  const [tmp, setTmp] = useState("")
  const [distance, setDistance] = useState(0)
  const [errorMessage, setErrorMessage] = useState("");
  const [stat, setStat] = useState(false);
  const [inputs, setInputs] = useState([{ id: 0, showButton: true }]);

  const handleAddInput = () => {
    const newId = inputs.length;
    setInputs([...inputs, { id: newId, showButton: true }]);
  };

  const handleConfirm = (id) => {
    calDist(inputs[inputs.length - 1].value)
    const address = inputs[id].value;

    if (address !== "") {
      setErrorMessage("");
      setStat(false);

      const newInputs = [...inputs];
      newInputs[id].showButton = false;
      setInputs(newInputs);

    } else {
      setErrorMessage("請輸入地址");
    }
  };

  const handleInputChange = (e, id) => {
    const newInputs = [...inputs];
    newInputs[id].value = e.target.value;
    setInputs(newInputs);
  };

  const calDist = (dist) => {
    console.log(dist)
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: ['永和仁愛公園'],
        destinations: [dist],
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status !== window.google.maps.DistanceMatrixStatus.OK) {
          window.alert('Error was' + status);
        } else {
          console.log(response.rows[0].elements[0].distance.value)
          updateDist(response.rows[0].elements[0].distance.value)
          setStat(true);
          setErrorMessage(""); // 
        }
      }
    );
  }

  const updateDist = (dist) => {
    console.log(distance)
    setDistance(prev => prev + dist)
  }

  const priceCal = (dist, num) => {
    if (num < 16) {
      return 180 + (dist / 5) * 16
    } else {
      if (dist < 5) {
        return 250
      } else if (dist < 10) {
        return 250 + (dist / 5) * 16
      } else {
        return 250 + (dist / 5) * 22
      }
    }
  }
  const [totalNum, setTotalNum] = useState(0)
  return (
    <div className="App">

      <div className='App-header' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h3>Loopick 運費計算機</h3>
        {inputs.map((input) => (
          <div key={input.id} style={{ display: "flex", flexDirection: "row", marginBottom:"2%" }} >
            <input placeholder='請輸入地址' value={input.value}
              onChange={(e) =>
                handleInputChange(e, input.id)
              }
            />
            {input.showButton && (
              <button
                onClick={() => handleConfirm(input.id)}
              >確認</button>
            )}
            {!input.showButton && (
              <button disabled>已確認</button>
            )}
          </div>
        ))}
        {/* <div style={{ display: "flex", flexDirection: "row" }} >
          <input placeholder='請輸入地址' value={tmp} onChange={(e) => setTmp(e.target.value)} />
          <button onClick={() => { setRn(tmp) }} >搜尋</button>
        </div> */}
        <button onClick={handleAddInput}>新增</button>


        {distance > 0 &&
          <div>
            {errorMessage !== "" && <p>{errorMessage}</p>}
            {/* <DistanceMatrixService
              options={{
                destinations: [rn],
                origins: ['永和仁愛公園'],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                try {
                  console.log(response.rows[0].elements[0].distance.value)
                  // setDistance(response.rows[0].elements[0].distance.value);
                  updateDist(response.rows[0].elements[0].distance.value)
                  setStat(true);
                  setErrorMessage(""); // 
                } catch (error) {
                  console.error(error);
                  setErrorMessage("請洽客服報價。"); // 錯誤訊息
                  setDistance(""); // 
                  setStat(false);
                }
              }}
            /> */}
            {/* <button onClick={handleAddInput}>新增</button> */}
            <div style={{ width: "100%", height: "2px", background: "white", margin: "5% 0%", fontSize: "18px" }} ></div>
            {errorMessage === "" && (
              <>
                <p>{distance / 1000} 公里</p>
                {
                  distance / 1000 > 15 ? <p>
                  距離較遠，請洽客服報價。
                  </p> :
                  <p>運費粗估為：{parseInt(priceCal(parseFloat(distance / 1000)))} 元</p>

                }
              </>
            )}
            <div style={{ fontSize: "12px" }}>
              <p>注意事項：</p>
              <p>
                1.  費用為大略估計，實際會依照天氣狀況、訂單緊急程度、司機安排路線問題等事件，有所增減，請以業務最終報價為準
              </p>
              <p>
                2. 此費用估算未含稅金，將以業務最終報價計算稅金
              </p>
              <p>
                3. 針對長期借用/多頻率借用另有優惠方案，請聯絡我們協助安排
              </p>
            </div>
          </div>
        }
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import { GoogleMap, DistanceMatrixService, DirectionsService } from "@react-google-maps/api";
// import { useState } from 'react';
// import axios from "axios"

// function App() {
//   const [rn, setRn] = useState("");
//   const [tmp, setTmp] = useState("");
//   const [distance, setDistance] = useState("");
//   const [distanceTot, setDistanceTot] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [stat, setStat] = useState(false);
//   const [inputs, setInputs] = useState([{ id: 0, showButton: true }]);
//   const [addressList, setAddressList] = useState([])
//   const [search, setSearch] = useState(false)
//   const origin = '永和仁愛公園';

//   const priceCal = (dist, num) => {
//     if (num < 16) {
//       return 180 + (dist / 5) * 16;
//     } else {
//       if (dist < 5) {
//         return 250;
//       } else if (dist < 10) {
//         return 250 + (dist / 5) * 16;
//       } else {
//         return 250 + (dist / 5) * 22;
//       }
//     }
//   };

//   const handleAddInput = () => {
//     const newId = inputs.length;
//     setInputs([...inputs, { id: newId, showButton: true }]);
//   };

//   const handleInputChange = (e, id) => {
//     const newInputs = [...inputs];
//     newInputs[id].value = e.target.value;
//     setInputs(newInputs);
//   };

  // const handleConfirm = (id) => {
  //   const address = inputs[id].value;

  //   let list = addressList

  //   if (address !== "") {
  //     setRn(address);
  //     setErrorMessage("");
  //     setStat(false);
  //     setDistance("");

  //     const newInputs = [...inputs];
  //     newInputs[id].showButton = false;
  //     setInputs(newInputs);

  //     console.log('149', address)
  //     list.push(address)
  //     setAddressList(list)

  //   } else {
  //     setErrorMessage("請輸入地址");
  //   }
  // };

//   const handleSearch = (address) => {
//     setRn(address);
//     setErrorMessage("");
//     setStat(false);
//     setDistance("");
//     console.log(addressList)
//     // console.log(rn)
//     const origin = '永和仁愛公園';
//     const service = new window.google.maps.DistanceMatrixService();
//   };

//   return (
//     <div className="App">
//       <div className='App-header' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//         <h3>Loopick 運費計算機</h3>
//         {inputs.map((input) => (
//           <div key={input.id} style={{ display: "flex", flexDirection: "row" }} >
//             <input placeholder='請輸入地址' value={input.value} onChange={(e) => 
//               handleInputChange(e, input.id)
//               } />
//             {input.showButton && (
//               <button onClick={() => handleConfirm(input.id)}>確認</button>
//             )}
//             {!input.showButton && (
//               <button disabled>已確認</button>
//             )}
//           </div>
//         ))}
//         <button onClick={handleAddInput}>新增</button>
//         {/* <button onClick={() => { setSearch(true); }}>計算價格</button> */}

//         {/* {search && */}
//         { distanceTot > 0 &&

//           <div>
//             {errorMessage !== "" && <p>{errorMessage}</p>}
//             <DistanceMatrixService
//               options={{
//                 destinations: [rn],
//                 origins: ['永和仁愛公園'],
//                 travelMode: "DRIVING",
//               }}
//               callback={(response) => {
//                 try {

//                   setDistance(response.rows[0].elements[0].distance.value);
//                   setDistanceTot(response.rows[0].elements[0].distance.value / 1000)
//                   setStat(true);
//                   setErrorMessage("");
//                 } catch (error) {
//                   console.error(error);
//                   setErrorMessage("請洽客服報價。");
//                   setDistance("");
//                   setStat(false);
//                 }
//               }}
//             />
//             <div style={{ width: "100%", height: "2px", background: "white", margin: "5% 0%", fontSize: "18px" }}></div>
//             {errorMessage === "" && (
//               <>
//                 {distanceTot / 1000 > 15 ? (
//                   <p>請洽客服報價。</p>
//                 ) : (
//                   <p>運費粗估為：{parseInt(priceCal(parseFloat(distance / 1000)))} 元</p>
//                 )}
//                 <p>總運送距離：{distanceTot.toFixed(2)} 公里</p>
//               </>
//             )}


//           </div>
//         }
//         <div style={{ fontSize: "12px" }}>
//           <p>注意事項：</p>
//           <p>1. 費用為大略估計，實際會依照天氣狀況、訂單緊急程度、司機安排路線問題等事件，有所增減，請以業務最終報價為準</p>
//           <p>2. 此費用估算未含稅金，將以業務最終報價計算稅金</p>
//           <p>3. 針對長期借用/多頻率借用另有優惠方案，請聯絡我們協助安排</p>
//         </div>
//         {/* } */}
//       </div>
//     </div>
//   );
// }

// export default App;
