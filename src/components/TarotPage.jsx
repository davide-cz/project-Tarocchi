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

    const {number}=useParams()

//fare una classe per le carte coperte 

//farne una per le carte scoperte 

//fare una funzione che al click sulla carta 
//la aggiunge ad un array che contiene le carte pescate - ok

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
                    tempDeckmischiato.splice(i,1)
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
    return (
        <>
            <div className="bg-gradient-to-b from-second to-quart tarot-page">
                <button className=""
                    onClick={()=>{
                        mischiaMazzo()
                }}>draw</button>
                {mazzoMischiato && 
                    <div className="cards-container ">
                        {mazzoMischiato.map(((card,i)=>{
                            return(
                                <div
                                    className={`tarot flex-shrink-0 relative`} 
                                    key={`card-${i}`}
                                    onClick={()=>{
                                        chooseACard(card)
                                    }}
                                    >
                                        <Tarot
                                            imgURL={dorso}
                                        />
                                </div>
                            )
                        }))}
                    </div>
                }
                {cartePescate.length===3 &&
                <button
                    onClick={()=>{
                        setShowResult(true)
                    }}
                >showResult</button>}
                
                <div className="cards-container results flex">
                    {cartePescate && 
                        cartePescate.map((card,i)=>{
                            return(
                                <div className="w-28" key={`choosen${card.name}${i}`}>
                                    <div className={`tarot selected-card transition-all
                                                     ${card.straight? '' : 'rotate-180'}`}
                                                     >
                                        <Tarot
                                            ind={card.number}
                                            cardValue={card.name}
                                            imgURL={showResult? card.urlImg : dorso}
                                        />
                                    </div>
                                        {showResult &&
                                        <div>
                                            <button
                                            onClick={()=>{openModal(i)}}
                                            >+</button>
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