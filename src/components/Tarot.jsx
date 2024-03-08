
export default function ({ind, cardValue, imgURL}){

  


    return (
        <>
            <figure className="tarot-img relative ">
                <img className="object-cover absolute top-0 left-0 w-full saturate-150" 
                    src={imgURL} 
                    alt="card-image" />
            </figure>
        </>
    )
}