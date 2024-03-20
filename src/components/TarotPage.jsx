import { useState } from "react"
import tarots from '../assets/tarot.json'
import Tarot from "./Tarot"
import dorso from "/tarots/dorso.jpg"
import { Link, useParams } from "react-router-dom";
import SingleTarot from "./SingleTarot";


export default function (){


    const [mazzoOrdinato,setMazzoOrdinato]=useState(tarots);
    const [mazzoMischiato,setMazzoMischiato]=useState([]);
    const [isDraw,setIsDraw]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [isOpen,setIsOpen]=useState(Array(3).fill(false))
    const [isSelected,setIsSelected]=useState(Array(22).fill(false))


    const [cartePescate,setCartePescate]=useState([]);

    const mischiaMazzo=()=>{
        const mazzoTemp=[]
        const mazzoOrdinatoTemp=[...mazzoOrdinato]
        for (let i=0; i < 22 ;i++){
            const rndmNumb=Math.floor(Math.random()*(22-i));
            mazzoTemp.push(mazzoOrdinatoTemp[rndmNumb]);
            mazzoOrdinatoTemp.splice(rndmNumb,1);
            setMazzoOrdinato(mazzoOrdinatoTemp)
        }
        setShowResult(false);
        setMazzoMischiato([...mazzoTemp]);
        setIsDraw(!isDraw);
        setCartePescate([]);
        setMazzoOrdinato(tarots);
        setIsSelected(Array(22).fill(false))
    };
    
    const chooseACard=(card)=>{

        const straightOrReverse=Math.round(Math.random());
        const straight=straightOrReverse===1? true : false;
        card.straight=straight

        if (cartePescate.length < 3 ){
            const tempDeckPesca=[...cartePescate];
            const tempDeckmischiato=[...mazzoMischiato];
            tempDeckPesca.push(card);

            for(let i=0 ;i<tempDeckmischiato.length; i++){
                if(mazzoMischiato[i].name.includes(card.name)){
                  
                }
            }
            setCartePescate(tempDeckPesca);
            setMazzoMischiato(tempDeckmischiato)
            console.log(card)
        }
    };
    
//funzioni che controllano apertura e chiusura della modale

const openModal = (index) => {
    const updatedOpenState = [...isOpen];
    updatedOpenState[index] = true;
    setIsOpen(updatedOpenState);
};

const closeModal = (index) => {
    const updatedOpenState = [...isOpen];
    updatedOpenState[index] = false;
    setIsOpen(updatedOpenState);
};

//funzione che blocca la card scelta
      const disableCard = (index) =>{
        const disableCardState = [...isSelected];
        disableCardState[index]=true;
        setIsSelected(disableCardState);
      }

     
        const [isCentered, setIsCentered] = useState(false);
      

    return (
        <>
            <div className="tarot-page bg-gradient-to-b  from-second to-quart tarot-page p-4 h-max overflow-scroll">
                <button className="act-btn flex m-auto"
                    onClick={()=>{
                        mischiaMazzo();
                        setIsCentered(true)
                }}>mischia mazzo</button>
                
                <button className={`act-btn flex mt-2 mx-auto  ${isCentered? 'animate-fade':'invisible'}`}
                    onClick={()=>{
                        setIsCentered(false)
                }}>distribuisci carte</button>
            
                {mazzoMischiato &&  
                    <div className={`cards-container transition-all animate-fade
                    ${isCentered ? 'relative' : '-space-x-20 '}`}>
                        {mazzoMischiato.map(((card,i)=>{
                            return(
                                
                                    <div
                                        className={`tarot hover:brightness-75 flex-shrink-0 pile duration-500 transition-all 
                                        ${isCentered ? 'absolute animate-fade' :  'relative animate-fade hover:-translate-y-5' }  
                                        ${isSelected[i]? 'brightness-50' : ''}
                                       
                                        `}
                                        key={`card-${i}`}
                                    >
                                        <Tarot
                                            imgURL={dorso}
                                        />
                                        <button
                                            disabled={isSelected[i] || isCentered || cartePescate.length===3 }
                                            className={`choosen-card-button absolute p-40 -ml-14 curs
                                            bg-transparent border-bg-transparent 
                                            hover:bg-transparent hover:border-bg-transparent
                                            `} 
                                            onClick={()=>{
                                                chooseACard(card)
                                                disableCard(i)
                                            }}
                                        >
                                        </button>
                                    </div>
                                
                            )
                        }))}
                    </div>
                }
                <button className={`act-btn duration-1000 opacity-0  ${cartePescate.length===3 ? 'opacity-100' : ''}`}
                    onClick={()=>{
                        setShowResult(true)
                    }}
                >showResult</button>
               
                <div className="cards-container results flex justify-around animate-fade">
                    {cartePescate.map((card,i)=>{
                            return(
                                <div className={`w-28 transition-opacity `} 
                                        key={`choosen${card.name}${i}`}>
                                    <div className={`tarot selected-card  scale-105 transition-all w-28 m-auto
                                                     ${card.straight? '' : 'rotate-180'}`}
                                    >
                                        <Tarot
                                            ind={card.number}
                                            cardValue={card.name}
                                            imgURL={showResult? card.urlImg : dorso}
                                        />
                                    </div>
                                        {showResult &&
                                        <div className="mt-2 " >
                                            <button
                                            onClick={()=>{openModal(i)}}
                                            className="act-btn text-xs font-semibold w-3/4"
                                            >mostra significato</button>
                                            <SingleTarot
                                                straightLecture={card.straightLecture}
                                                number={card.number}
                                                name={card.name}
                                                reverseLecture={card.reverseLecture}
                                                straight={card.straight}
                                                urlImg={card.urlImg}
                                                isOpen={isOpen[i]}
                                                closeModal={() => closeModal(i)}
                                            />
                                        </div>
                                        }
                                    {showResult &&
                                    <div>
                                        <h4 
                                            className="flex justify-center text-center w-auto">{card.number} {card.name}</h4>
                                    </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
            </div>
        </>
    )
    
} 