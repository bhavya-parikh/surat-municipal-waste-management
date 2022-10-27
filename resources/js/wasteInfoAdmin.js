import axios from 'axios'
import moment from 'moment'

export function initWasteInfoAdmin(){
    const wasteInfoTableAdminBody = document.querySelector('#wasteInfoAdminTableBody')
    let plasticInfos = []
    let markup
    axios.get('/update-waste-info-back', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        plasticInfos = res.data
        markup = generateMarkup(plasticInfos)
        wasteInfoAdminTableBody.innerHTML = markup
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
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/admin/update-waste-info/status" method="POST">
                            <input type="hidden" name="_id" value="${ plasticInfo._id }">
                            <select name="WasteStatus" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="Pending"
                                    ${ plasticInfo.WasteStatus === 'Pending' ? 'selected' : '' }>
                                    Pending</option>
                                <option value="Sold" ${ plasticInfo.WasteStatus === 'Sold' ? 'selected' : '' }>
                                    Sold
                                </option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
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

