export default function Sign({onKeyPress}){
          function handleOperation(event){
             const child=event.target.closest('p')
             if(child){
                if(child)
                    onKeyPress(child.textContent)
             }
          }
    return(
        <div className="signs"  onClick={handleOperation}>   
            <p>÷</p>
            <p>x</p>
            <p>_</p>
            <p>+</p>
            <p>=</p>
        </div>
    )
}