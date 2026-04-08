
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants';
import Answer from './components/Answers';

function App() {
  const[question, setQuestion] = useState('');
  const[result,setResult]= useState([]);
  const[recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('History')));
  const[selectedHistory, setSelectedHistory] = useState('');
  const[loading, setLoading] = useState(false);
  const scrollToBottom = useRef();

  
  const askQuestion= async ()=>{

    if(!question && !selectedHistory){
      return false;
    }

    if(question){
      if (localStorage.getItem('History')) {
        let History = JSON.parse(localStorage.getItem('History'));
        History = [question, ...History];
        localStorage.setItem('History', JSON.stringify(History));
        setRecentHistory(History);

      }
      else {
        localStorage.setItem('History', JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }
    
    const payloadData = question?question:selectedHistory;
    const payload = {
      "contents": [
        {
          "parts": [
            {
              "text": payloadData
            }
          ]
        }
      ]
    }

    setLoading(true);

    let response = await fetch(URL, {
      method:"POST",
      body: JSON.stringify(payload)
    })

    response = await response.json();

    let rawData = response.candidates[0].content.parts[0].text;
    // rawData = rawData.replaceAll('#', ' ');
    rawData = rawData.replaceAll('*', ' ');
    rawData = rawData.split('\n');
    rawData = rawData.map((item)=>item.trim());
    
    // console.log(rawData);
    setResult([...result,{type:'q', text: question?question:selectedHistory},{type:'a', text: rawData}]);
    setQuestion('');
    setTimeout(() => {
      scrollToBottom.current.scrollTop = scrollToBottom.current.scrollHeight;
    },500);

    setLoading(false);
  }

  const clearRecentHistory= ()=>{
    localStorage.setItem('History', JSON.stringify([]));
    setRecentHistory([]);
  }

  const isEnter = (event)=>{
    if(event.key === 'Enter'){
      askQuestion();
    }
  }
  useEffect(()=>{
    askQuestion();
  },[selectedHistory])


  return (
    <div className="grid grid-cols-5 h-screen bg-[#212121]">
      <div className="grid-cols-1 bg-[#181818] text-white">
        <div className='flex justify-center-safe'>
          <h1 className='text-xl text-center p-2'>Recent Searches</h1>
          <button className='p-2 rounded-2xl   cursor-pointer' onClick={clearRecentHistory}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" /></svg>
          </button>
        </div>
        
        <ul className='text-left overflow-auto m-3'>
          {
            recentHistory && recentHistory.map((item)=>(
              <li onClick={()=> setSelectedHistory(item)} className='truncate p-1 pl-4 cursor-pointer hover:bg-zinc-700 rounded-2xl'>{item}</li>
            ))
          }
        </ul>
      </div>
      <div className="grid-cols-4 text-center">
        <div ref={scrollToBottom} className='container h-160 p-5 pl-60 pr-40 overflow-auto no-scrollbar w-250 '>
          <h1 className='text-white font-bold absolute left-90'>ChaturGPT</h1>
          <div className='text-white '>
            {loading?
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"><animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate" /></path></svg>
              </div>
            : null}
            <ul>
              {
                result.map((item, index) => (
                  <div key={index + Math.random()} className={item.type=='q' ? "flex justify-end" : ""}>
                    {
                      item.type == 'q' ? <li key={index + Math.random()} className='text-right bg-[#303030] border border-[#303030] m-5 rounded-3xl p-2 pr-5 pl-5 w-fit '>
                        <Answer ans={item.text} index={index} totalResult={1} />
                      </li> : item.text.map((answerItem, answerIndex) => (
                        <li key={answerIndex + Math.random()} className='text-left p-1'>
                          <Answer ans={answerItem} index={answerIndex} totalResult={item.length} />
                        </li>
                      ))
                    }
                  </div>
                ))
              }
            </ul>
            {/* {result} */}
            {/* <ul>
              {
                result && result.map((item, index) => (
                  <li className='text-left p-1'>
                    <Answer ans={item} key={index+Math.random()} />
                  </li>
                  
                ))
              } */}
            
            
          </div>
        </div>
        <div className='bg-[#303030] mt-5 w-14/8 text-white ml-70 rounded-2xl border-zinc-700 border flex'>
          <input type="text"
          onKeyDown={isEnter} 
          onChange={(event) => setQuestion(event.target.value)} value={question} className='w-full h-full p-2.5 outline-0' placeholder='Ask Me Anything' />
          <button onClick={askQuestion} className='p-2.5'>Ask</button>

        </div>

      </div>
    </div>
  )
}

export default App
