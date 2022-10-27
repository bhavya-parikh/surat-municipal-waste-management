import axios from 'axios'
import moment from 'moment'

export function initWasteInfoUser(){
    const wasteInfoTableBody = document.querySelector('#wasteInfoTableBody')
    let plasticInfos = []
    let markup
    axios.get('/waste-info-user', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        plasticInfos = res.data
        markup = generateMarkup(plasticInfos)
        wasteInfoTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })

    function generateMarkup(plasticInfos){
        return plasticInfos.map(plasticInfo => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">${ plasticInfo.CenterName } </td>
                <td class="border px-4 py-2">${ plasticInfo.WasteType }</td>
                <td class="border px-4 py-2">${ plasticInfo.WasteQty }</td>
                <td class="border px-4 py-2">${ plasticInfo.WasteDesc }</td>
                    <div class="inline-block relative w-64">
                        
                        
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${ moment(plasticInfo.createdAt).format('MMM Do YY') }
                </td>
            </tr>
        `
        }).join('')
    }
}

