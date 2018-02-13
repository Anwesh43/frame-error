const page_name = document.getElementById('page_name')
console.log(page_name)
const errorList = document.createElement('ul')
const createLI = (text) => "<li>"+text+"</li>"
const errorCapturingHtml = `<body><script>window.onerror = (errorMsg,url,lineNumber,col,m)=> {console.log("error captured here");console.log(url);console.log(lineNumber);console.log(errorMsg);window.newError(errorMsg);return true;}</script><script>setTimeout(()=>{hell();},100)</script>`
page_name.onkeyup = (event) =>  {
    if(event.keyCode == 13) {
        const value = encodeURIComponent(page_name.value)
        fetch(`http://localhost:8000/api/getsite/${value}`).then(res => res.json()).then(jsonData => {
            console.log(jsonData)
            var html = jsonData.html
            const iFrame = document.createElement('iframe')
            document.body.appendChild(errorList)
            errorList.innerHTML = ''
            var liText = ""
            iFrame.onload = () => {
                console.log(iFrame.contentWindow)
                if(iFrame.contentWindow) {
                    if(iFrame.contentWindow.window) {
                        console.log("capturing error")
                        iFrame.contentWindow.window.newError = (errorMsg,url,lineNumber) => {
                          console.log("error")
                          console.log(errorMsg)
                          liText += createLI(errorMsg)
                          errorList.innerHTML = liText
                          return true
                      }
                    }
                    const doc = iFrame.contentWindow.document
                    const htmlParts = html.split("<body>")
                    newHtml = errorCapturingHtml
                    if(htmlParts.length > 0) {
                        console.log(newHtml)
                        for(var i = 1; i < htmlParts.length; i++) {
                            newHtml += htmlParts[i]
                        }
                    }
                    if(doc) {
                        doc.open()
                        doc.write(newHtml)
                        doc.close()
                    }
                }
            }
            iFrame.innerHTML = errorCapturingHtml
            document.body.appendChild(iFrame)
        })
    }
}
