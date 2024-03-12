import { useEffect, useRef } from "react"

export default function ({isOpen, closeModal, straightLecture, number, name, reverseLecture, straight, urlImg}){

  

    const dialogRef=useRef()

    
    useEffect(()=>{
        if(isOpen){
            dialogRef.current.showModal()
        }else{
            dialogRef.current.close()
        }
    },[isOpen]);


    return (
        <>
            <dialog ref={dialogRef} className={`dialog-modal scroll-smooth `}>
                <div className="flex flex-col align-middle relative">
                    <figure className=" flex border-8 border-quart rounded-md">
                        <img className="flex-shrink-0 w-full rounded shadow-lg" 
                            src={urlImg} 
                            alt="card-image" />
                    </figure>
                    <div className="p-4">
                        <h1>{number} - {name}</h1>
                        <p>{straight===true ? straightLecture : reverseLecture}</p>
                    </div>
                    <button className="act-btn font-bold absolute top-1 right-1"
                        onClick={()=>{
                            closeModal(false)
                        }}
                    >X</button>
                </div>
            </dialog>
        </>
    )
}