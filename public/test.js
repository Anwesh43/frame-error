
    for(var i=0;i<3;i++) {
        const index = i
        document.getElementById(`button${i+1}`).onclick = () => {
            eval(`call${index}()`)
        }
        setTimeout(() => {
            eval(`hello${index}()`)
        },(i+1)*2000)
    }
